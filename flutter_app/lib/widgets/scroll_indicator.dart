import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../services/l10n_service.dart';

/// Animated "scroll" hint at the bottom of the hero section.
class ScrollIndicator extends StatefulWidget {
  final L10nService l10n;

  const ScrollIndicator({super.key, required this.l10n});

  @override
  State<ScrollIndicator> createState() => _ScrollIndicatorState();
}

class _ScrollIndicatorState extends State<ScrollIndicator>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _opacity;
  late final Animation<double> _offset;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);

    _opacity = Tween(begin: 1.0, end: 0.3).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    _offset = Tween(begin: 0.0, end: 6.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: widget.l10n,
      builder: (context, _) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Mouse/scroll capsule shape
            Container(
              width: 20,
              height: 30,
              decoration: BoxDecoration(
                border: Border.all(color: AppColors.textPrimary, width: 2),
                borderRadius: BorderRadius.circular(10),
              ),
              child: AnimatedBuilder(
                animation: _controller,
                builder: (context, _) {
                  return Padding(
                    padding: EdgeInsets.only(top: 6 + _offset.value),
                    child: Opacity(
                      opacity: _opacity.value,
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: Container(
                          width: 4,
                          height: 8,
                          decoration: BoxDecoration(
                            color: AppColors.textPrimary,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),
            Text(
              widget.l10n.t('scene.01.scroll_hint'),
              style: AppTypography.small.copyWith(
                color: AppColors.textPrimary,
                fontSize: 13,
              ),
            ),
          ],
        );
      },
    );
  }
}
