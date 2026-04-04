import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/video_segment.dart';
import '../services/l10n_service.dart';
import 'tag_chip.dart';

/// Content overlay shown over the active scrub video.
/// Positioned bottom-left, matching .scrub-overlay__content--bottom-left.
class SceneOverlayWidget extends StatelessWidget {
  final SceneOverlay overlay;
  final L10nService l10n;

  const SceneOverlayWidget({
    super.key,
    required this.overlay,
    required this.l10n,
  });

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < 870;

    return Positioned(
      left: 0,
      bottom: isMobile ? 24 : 64,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: isMobile ? width * 0.38 : 620,
        ),
        padding: EdgeInsets.symmetric(
          horizontal: isMobile ? 16 : 32,
          vertical: 8,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Title
            Text(
              l10n.t(overlay.titleKey),
              style: AppTypography.sceneTitle.copyWith(
                fontSize: isMobile ? 14 : 32,
              ),
            ),

            // Subtitle (optional)
            if (overlay.subtitleKey != null) ...[
              const SizedBox(height: 4),
              Text(
                l10n.t(overlay.subtitleKey!),
                style: AppTypography.small.copyWith(
                  color: AppColors.textPrimary,
                  fontSize: isMobile ? 10 : 13,
                ),
              ),
            ],

            // Tags
            if (overlay.tags.isNotEmpty) ...[
              SizedBox(height: isMobile ? 4 : 16),
              Wrap(
                spacing: isMobile ? 3 : 8,
                runSpacing: isMobile ? 3 : 8,
                children: overlay.tags
                    .map((t) => TagChip(tag: t))
                    .toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
