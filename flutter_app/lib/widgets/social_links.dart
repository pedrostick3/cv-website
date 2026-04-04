import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../config/theme.dart';

/// GitHub / LinkedIn / Medium link buttons.
class SocialLinks extends StatelessWidget {
  final double iconSize;
  final Axis direction;

  const SocialLinks({
    super.key,
    this.iconSize = 18,
    this.direction = Axis.vertical,
  });

  @override
  Widget build(BuildContext context) {
    final items = [
      _SocialItem(
        icon: Icons.code,
        label: 'GitHub',
        url: 'https://github.com/pedrostick3',
      ),
      _SocialItem(
        icon: Icons.work_outline,
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/pedro-afonso-dionisio',
      ),
      _SocialItem(
        icon: Icons.article_outlined,
        label: 'Medium',
        url: 'https://medium.com/@pedrostick3',
      ),
    ];

    final children = items
        .map((item) => _SocialButton(item: item, iconSize: iconSize))
        .toList();

    if (direction == Axis.horizontal) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: children
            .expand((w) => [w, const SizedBox(width: 8)])
            .toList()
          ..removeLast(),
      );
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: children
          .expand((w) => [w, const SizedBox(height: 16)])
          .toList()
        ..removeLast(),
    );
  }
}

class _SocialItem {
  final IconData icon;
  final String label;
  final String url;
  const _SocialItem({
    required this.icon,
    required this.label,
    required this.url,
  });
}

class _SocialButton extends StatefulWidget {
  final _SocialItem item;
  final double iconSize;

  const _SocialButton({required this.item, required this.iconSize});

  @override
  State<_SocialButton> createState() => _SocialButtonState();
}

class _SocialButtonState extends State<_SocialButton> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse(widget.item.url)),
        child: Semantics(
          label: widget.item.label,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: _hovering
                    ? AppColors.purpleGlow
                    : AppColors.borderDefault,
              ),
              color: _hovering
                  ? AppColors.purple.withValues(alpha: 0.08)
                  : Colors.transparent,
            ),
            child: Icon(
              widget.item.icon,
              size: widget.iconSize,
              color: _hovering
                  ? AppColors.purpleLight
                  : AppColors.textSecondary,
            ),
          ),
        ),
      ),
    );
  }
}
