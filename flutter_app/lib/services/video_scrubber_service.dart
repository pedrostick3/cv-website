import 'package:flutter/foundation.dart';
import 'package:video_player/video_player.dart';

import '../models/video_segment.dart';

/// Manages the video scrubber timeline — maps a scroll offset (0.0–1.0)
/// to the correct video and seek position, exactly like the JS VideoScrubber.
class VideoScrubberService extends ChangeNotifier {
  final List<VideoPlayerController> controllers = [];
  final List<VideoSegment> timeline = [];

  double totalDuration = 0; // seconds
  int activeIndex = -1;
  bool isReady = false;

  /// Height in logical pixels for the scroll container.
  /// Matches `totalDuration * pixelsPerSecond` from the JS version.
  double get scrollHeight => totalDuration * pixelsPerSecond;

  final double pixelsPerSecond;

  VideoScrubberService({this.pixelsPerSecond = 200});

  /// Base URL for video assets. On Flutter Web, assets served from /assets/videos/.
  static const _videoBase = 'assets/videos/';

  /// Initialize all video controllers and build the cumulative timeline.
  Future<void> init() async {
    double cumTime = 0;

    for (int i = 0; i < kVideoManifest.length; i++) {
      final entry = kVideoManifest[i];
      final controller = VideoPlayerController.networkUrl(
        Uri.parse('$_videoBase${entry.path}'),
      );

      await controller.initialize();
      controller.setVolume(0);

      final dur = controller.value.duration.inMilliseconds / 1000.0;
      timeline.add(VideoSegment(
        index: i,
        assetPath: entry.path,
        duration: controller.value.duration,
        startTime: Duration(milliseconds: (cumTime * 1000).round()),
        endTime: Duration(milliseconds: ((cumTime + dur) * 1000).round()),
        overlay: entry.overlay,
      ));

      controllers.add(controller);
      cumTime += dur;
    }

    totalDuration = cumTime;
    isReady = true;

    // Show first frame
    if (controllers.isNotEmpty) {
      activeIndex = 0;
      await controllers[0].seekTo(Duration.zero);
    }

    notifyListeners();
    debugPrint(
      '[VideoScrubber] Ready — ${controllers.length} videos, '
      '${totalDuration.toStringAsFixed(1)}s total, '
      '${scrollHeight.toStringAsFixed(0)}px scroll height',
    );
  }

  /// Called by the scroll listener. [scrollOffset] is the raw scroll position
  /// within the scrub wrapper (0 = start of first video).
  void onScroll(double scrollOffset) {
    if (!isReady || totalDuration <= 0) return;

    final maxScroll = scrollHeight - 1; // approx viewport height subtracted by caller
    if (maxScroll <= 0) return;

    final clamped = scrollOffset.clamp(0.0, maxScroll);
    final targetTime = (clamped / maxScroll) * totalDuration;
    _seekToTime(targetTime);
  }

  void _seekToTime(double timeSeconds) {
    // Find which video segment this time falls into
    int idx = -1;
    for (int i = 0; i < timeline.length; i++) {
      final seg = timeline[i];
      final start = seg.startTime.inMilliseconds / 1000.0;
      final end = seg.endTime.inMilliseconds / 1000.0;
      if (timeSeconds >= start && timeSeconds < end) {
        idx = i;
        break;
      }
    }
    if (idx == -1) idx = timeline.length - 1;

    final seg = timeline[idx];
    final start = seg.startTime.inMilliseconds / 1000.0;
    final localTime = (timeSeconds - start).clamp(0.0, seg.duration.inMilliseconds / 1000.0 - 0.001);

    // Switch active video if needed
    if (idx != activeIndex) {
      activeIndex = idx;
      notifyListeners();
    }

    // Seek the active controller
    final controller = controllers[idx];
    final targetMs = (localTime * 1000).round();
    final currentMs = controller.value.position.inMilliseconds;

    // Only seek if meaningful difference (>33ms ≈ 1 frame at 30fps)
    if ((currentMs - targetMs).abs() > 33) {
      controller.seekTo(Duration(milliseconds: targetMs));
    }
  }

  /// Get the overlay for the currently active video (if any).
  SceneOverlay? get activeOverlay {
    if (activeIndex < 0 || activeIndex >= timeline.length) return null;
    return timeline[activeIndex].overlay;
  }

  @override
  void dispose() {
    for (final c in controllers) {
      c.dispose();
    }
    super.dispose();
  }
}
