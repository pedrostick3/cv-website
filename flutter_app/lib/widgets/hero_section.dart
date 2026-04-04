import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

import '../config/theme.dart';
import '../services/l10n_service.dart';
import 'scroll_indicator.dart';
import 'social_links.dart';

/// Full-screen hero section with looping video background.
/// Matches #hero-section from the original HTML.
class HeroSection extends StatefulWidget {
  final L10nService l10n;

  const HeroSection({super.key, required this.l10n});

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection> {
  late final VideoPlayerController _controller;
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.networkUrl(
      Uri.parse('assets/videos/hero_section_loop.mp4'),
    );
    _controller.setLooping(true);
    _controller.setVolume(0);
    _controller.initialize().then((_) {
      if (mounted) {
        setState(() => _initialized = true);
        _controller.play();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);

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
                width: _controller.value.size.width,
                height: _controller.value.size.height,
                child: VideoPlayer(_controller),
              ),
            ),

          // Gradient overlay for text legibility
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  AppColors.bgPrimary.withValues(alpha: 0.1),
                  AppColors.bgPrimary.withValues(alpha: 0.5),
                ],
              ),
            ),
          ),

          // Content
          ListenableBuilder(
            listenable: widget.l10n,
            builder: (context, _) {
              return Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: size.width > 1024 ? 64 : 24,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Greeting
                    Text(
                      widget.l10n.t('scene.01.greeting').toUpperCase(),
                      style: AppTypography.greeting,
                    ),
                    const SizedBox(height: 16),

                    // Name
                    Text(
                      widget.l10n.t('scene.01.name_first'),
                      style: AppTypography.heroName.copyWith(
                        fontWeight: FontWeight.w300,
                        color: AppColors.textPrimary.withValues(alpha: 0.7),
                        fontSize: size.width > 768 ? 64 : 48,
                      ),
                    ),
                    Text(
                      widget.l10n.t('scene.01.name_last'),
                      style: AppTypography.heroName.copyWith(
                        fontSize: size.width > 768 ? 64 : 48,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Title
                    RichText(
                      text: TextSpan(
                        style: AppTypography.subtitle.copyWith(
                          fontSize: size.width > 768 ? 18 : 14,
                        ),
                        children: const [
                          TextSpan(
                            text: 'AI Engineer',
                            style: TextStyle(color: AppColors.pinkLight),
                          ),
                          TextSpan(text: ' & Full-Stack Developer'),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Motto
                    Text(
                      widget.l10n.t('scene.01.motto'),
                      style: AppTypography.small.copyWith(
                        color: AppColors.textPrimary,
                        letterSpacing: 1.5,
                      ),
                    ),
                    const SizedBox(height: 64),
                  ],
                ),
              );
            },
          ),

          // Social links — bottom-left
          Positioned(
            left: size.width > 768 ? 32 : 16,
            bottom: size.width > 768 ? 32 : 64,
            child: const SocialLinks(),
          ),

          // Scroll indicator — bottom-right on mobile, center on desktop
          Positioned(
            bottom: 32,
            right: size.width > 768 ? null : 24,
            left: size.width > 768 ? 0 : null,
            child: size.width > 768
                ? Center(child: ScrollIndicator(l10n: widget.l10n))
                : ScrollIndicator(l10n: widget.l10n),
          ),
        ],
      ),
    );
  }
}
