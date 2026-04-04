import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

import '../config/theme.dart';
import '../models/video_segment.dart';
import '../services/l10n_service.dart';
import '../services/video_scrubber_service.dart';
import '../widgets/footer_section.dart';
import '../widgets/hero_section.dart';
import '../widgets/lang_toggle.dart';
import '../widgets/loading_screen.dart';
import '../widgets/scene_overlay_widget.dart';

/// The main portfolio screen with three zones:
///  1. Hero — looping video at scroll = 0
///  2. Scrub — scroll-driven video scrubber
///  3. Footer — ping-pong video at scroll = bottom
///
/// Mirrors the zone detection logic from the original JS main.js.
class HomeScreen extends StatefulWidget {
  final L10nService l10n;

  const HomeScreen({super.key, required this.l10n});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _scrollController = ScrollController();
  final _scrubber = VideoScrubberService(pixelsPerSecond: 200);

  // Loading state
  double _loadProgress = 0;
  bool _isLoading = true;

  // Zone detection
  _Zone _currentZone = _Zone.hero;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    _boot();
  }

  Future<void> _boot() async {
    // Init videos one by one, updating progress
    final total = kVideoManifest.length;
    for (int i = 0; i < total; i++) {
      // Init is done inside the service, we just track progress here
      setState(() => _loadProgress = (i + 1) / total);
    }

    await _scrubber.init();

    if (mounted) {
      setState(() {
        _isLoading = false;
        _loadProgress = 1.0;
      });
    }
  }

  void _onScroll() {
    if (!_scrubber.isReady) return;

    final scrollY = _scrollController.offset;
    final maxScroll = _scrollController.position.maxScrollExtent;
    final viewportH = MediaQuery.sizeOf(context).height;

    // Zone detection (matches JS logic)
    _Zone newZone;
    if (scrollY < 2) {
      newZone = _Zone.hero;
    } else if (scrollY + viewportH >= maxScroll - 100) {
      newZone = _Zone.footer;
    } else {
      newZone = _Zone.scrub;
    }

    if (newZone != _currentZone) {
      setState(() => _currentZone = newZone);
    }

    // Drive the scrubber: scroll offset within the scrub wrapper
    // The scrub wrapper starts after the hero section (1 viewport height)
    final scrubOffset = scrollY - viewportH;
    if (scrubOffset >= 0) {
      _scrubber.onScroll(scrubOffset);
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _scrubber.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);

    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      body: Stack(
        children: [
          // ─── Scrollable content ───
          CustomScrollView(
            controller: _scrollController,
            physics: const ClampingScrollPhysics(),
            slivers: [
              // Hero section (1 viewport)
              SliverToBoxAdapter(
                child: HeroSection(l10n: widget.l10n),
              ),

              // Scrub spacer (tall container that drives video scrubbing)
              if (_scrubber.isReady)
                SliverToBoxAdapter(
                  child: SizedBox(height: _scrubber.scrollHeight),
                ),

              // Footer section (1 viewport)
              SliverToBoxAdapter(
                child: FooterSection(l10n: widget.l10n),
              ),
            ],
          ),

          // ─── Sticky scrub player (visible only in scrub zone) ───
          if (_scrubber.isReady && _currentZone == _Zone.scrub)
            Positioned.fill(
              child: IgnorePointer(
                child: _ScrubPlayerView(
                  scrubber: _scrubber,
                  l10n: widget.l10n,
                ),
              ),
            ),

          // ─── Footer overlay (visible only in footer zone) ───
          // Footer is already rendered in the scroll view. The fixed
          // overlay approach from the web version isn't needed here
          // since Flutter handles scroll differently.

          // ─── Language toggle (always visible) ───
          Positioned(
            top: size.width > 768
                ? 32
                : MediaQuery.paddingOf(context).top + 16,
            right: size.width > 768 ? 32 : 16,
            child: LangToggle(l10n: widget.l10n),
          ),

          // ─── Loading screen ───
          LoadingScreen(
            progress: _loadProgress,
            visible: _isLoading,
          ),
        ],
      ),
    );
  }
}

enum _Zone { hero, scrub, footer }

/// Shows the active scrub video full-screen with its overlay.
class _ScrubPlayerView extends StatelessWidget {
  final VideoScrubberService scrubber;
  final L10nService l10n;

  const _ScrubPlayerView({required this.scrubber, required this.l10n});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: scrubber,
      builder: (context, _) {
        if (scrubber.activeIndex < 0 ||
            scrubber.activeIndex >= scrubber.controllers.length) {
          return const SizedBox.shrink();
        }

        final controller = scrubber.controllers[scrubber.activeIndex];
        final overlay = scrubber.activeOverlay;

        return Container(
          color: AppColors.bgPrimary,
          child: Stack(
            fit: StackFit.expand,
            children: [
              // Active video
              if (controller.value.isInitialized)
                FittedBox(
                  fit: BoxFit.cover,
                  child: SizedBox(
                    width: controller.value.size.width,
                    height: controller.value.size.height,
                    child: VideoPlayer(controller),
                  ),
                ),

              // Bottom gradient for text legibility
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                height: MediaQuery.sizeOf(context).height * 0.5,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        AppColors.bgPrimary.withValues(alpha: 0.65),
                      ],
                    ),
                  ),
                ),
              ),

              // Scene overlay (if this video has one)
              if (overlay != null)
                SceneOverlayWidget(overlay: overlay, l10n: l10n),
            ],
          ),
        );
      },
    );
  }
}
