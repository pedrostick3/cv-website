import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/video_segment.dart';

/// Styled tech tag matching .tag--{color} from the CSS.
class TagChip extends StatelessWidget {
  final TagInfo tag;

  const TagChip({super.key, required this.tag});

  Color get _color {
    switch (tag.color) {
      case TagColor.purple:
        return AppColors.purpleLight;
      case TagColor.teal:
        return AppColors.tealLight;
      case TagColor.coral:
        return AppColors.coralLight;
      case TagColor.blue:
        return AppColors.blueLight;
      case TagColor.pink:
        return AppColors.pinkLight;
    }
  }

  Color get _borderColor {
    switch (tag.color) {
      case TagColor.purple:
        return AppColors.purpleGlow;
      case TagColor.teal:
        return AppColors.tealGlow;
      case TagColor.coral:
        return AppColors.coralGlow;
      case TagColor.blue:
        return AppColors.blueGlow;
      case TagColor.pink:
        return AppColors.pinkGlow;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(9999),
        border: Border.all(color: _borderColor),
        color: AppColors.bgSurface,
      ),
      child: Text(
        tag.label,
        style: AppTypography.tag.copyWith(color: _color),
      ),
    );
  }
}
