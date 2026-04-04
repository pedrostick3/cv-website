import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:video_player/video_player.dart';

import '../config/theme.dart';
import '../services/l10n_service.dart';
import 'social_links.dart';

/// Footer with looping ping-pong video + download links.
/// Matches #footer-section from the original HTML.
class FooterSection extends StatefulWidget {
  final L10nService l10n;

  const FooterSection({super.key, required this.l10n});

  @override
  State<FooterSection> createState() => _FooterSectionState();
}

class _FooterSectionState extends State<FooterSection>
    with SingleTickerProviderStateMixin {
  late final VideoPlayerController _video;
  bool _initialized = false;
  bool _reversing = false;
  late final Ticker _ticker;

  @override
  void initState() {
    super.initState();
    _video = VideoPlayerController.networkUrl(
      Uri.parse('assets/videos/scene_11_loop.mp4'),
    );
    _video.setVolume(0);
    _video.initialize().then((_) {
      if (!mounted) return;
      setState(() => _initialized = true);
      _video.play();
    });

    // Ping-pong: when forward play finishes, reverse via ticker
    _video.addListener(_onVideoUpdate);

    _ticker = createTicker(_reverseStep)..start();
  }

  void _onVideoUpdate() {
    if (_video.value.position >= _video.value.duration &&
        !_reversing &&
        _video.value.duration > Duration.zero) {
      _reversing = true;
    }
  }

  void _reverseStep(Duration elapsed) {
    if (!_reversing || !_initialized) return;

    final newTime = _video.value.position - const Duration(milliseconds: 16);
    if (newTime <= Duration.zero) {
      _reversing = false;
      _video.seekTo(Duration.zero);
      _video.play();
      return;
    }
    _video.seekTo(newTime);
  }

  @override
  void dispose() {
    _ticker.dispose();
    _video.removeListener(_onVideoUpdate);
    _video.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final isMobile = size.width < 870;

    return SizedBox(
      width: size.width,
      height: size.height,
      child: Stack(
        fit: StackFit.expand,
        children: [
          // Video background
          if (_initialized)
            FittedBox(
              fit: BoxFit.cover,
              child: SizedBox(
                width: _video.value.size.width,
                height: _video.value.size.height,
                child: VideoPlayer(_video),
              ),
            ),

          // Content — bottom-right, clean footer style
          Positioned(
            bottom: isMobile ? 25 : 64,
            right: isMobile ? 25 : 128,
            child: ListenableBuilder(
              listenable: widget.l10n,
              builder: (context, _) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _DownloadButton(
                      label: widget.l10n.t('scene.11.download_full_pt'),
                      url: 'assets/cvs/CV_PedroDionisio_2025_PT.pdf',
                    ),
                    const SizedBox(height: 4),
                    _DownloadButton(
                      label: widget.l10n.t('scene.11.download_full_en'),
                      url: 'assets/cvs/CV_PedroDionisio_2025_EN.pdf',
                    ),
                    const SizedBox(height: 4),
                    _DownloadButton(
                      label: widget.l10n.t('scene.11.download_ai_en'),
                      url: 'assets/cvs/CV_AI_PedroDionisio_2025_EN.pdf',
                    ),
                    const SizedBox(height: 16),
                    const SocialLinks(
                      direction: Axis.horizontal,
                      iconSize: 18,
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _DownloadButton extends StatefulWidget {
  final String label;
  final String url;

  const _DownloadButton({required this.label, required this.url});

  @override
  State<_DownloadButton> createState() => _DownloadButtonState();
}

class _DownloadButtonState extends State<_DownloadButton> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse(widget.url)),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.download_outlined,
              size: 16,
              color: _hovering
                  ? AppColors.textPrimary
                  : AppColors.textSecondary,
            ),
            const SizedBox(width: 8),
            Text(
              widget.label,
              style: AppTypography.small.copyWith(
                color: _hovering
                    ? AppColors.textPrimary
                    : AppColors.textSecondary,
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
