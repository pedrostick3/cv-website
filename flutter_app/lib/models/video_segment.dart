/// Represents a single video in the scrub timeline.
class VideoSegment {
  final int index;
  final String assetPath;
  final Duration duration;
  final Duration startTime;
  final Duration endTime;

  /// Scene overlay metadata (null for transitions without overlays).
  final SceneOverlay? overlay;

  const VideoSegment({
    required this.index,
    required this.assetPath,
    required this.duration,
    required this.startTime,
    required this.endTime,
    this.overlay,
  });
}

/// Content overlay shown during a specific video segment.
class SceneOverlay {
  final String titleKey;
  final String? subtitleKey;
  final List<TagInfo> tags;

  const SceneOverlay({
    required this.titleKey,
    this.subtitleKey,
    this.tags = const [],
  });
}

/// A tech/skill tag with color category.
class TagInfo {
  final String label;
  final TagColor color;

  const TagInfo(this.label, this.color);
}

enum TagColor { purple, teal, coral, blue, pink }

/// All 10 scrub videos in playback order.
/// Duration is set to Duration.zero initially and resolved at runtime
/// after video controllers load metadata.
const List<({String path, SceneOverlay? overlay})> kVideoManifest = [
  // 0: scene_1 (no overlay)
  (path: 'scene_1.mp4', overlay: null),

  // 1: transition 1→2 (no overlay)
  (path: 'scene_1_to_scene_2_transition.mp4', overlay: null),

  // 2: scene_2 — 3D House Italy
  (
    path: 'scene_2.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.02.title',
      subtitleKey: 'scene.02.subtitle',
      tags: [
        TagInfo('Cinema4D', TagColor.coral),
        TagInfo('AutoCAD', TagColor.coral),
        TagInfo('ArchiCAD', TagColor.coral),
        TagInfo('Erasmus+', TagColor.coral),
      ],
    ),
  ),

  // 3: transition 2→3 (no overlay)
  (path: 'scene_2_to_scene_3_transition.mp4', overlay: null),

  // 4: scene_3 — Phone Breaks
  (
    path: 'scene_3.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.03.title',
      subtitleKey: 'scene.03.subtitle',
      tags: [
        TagInfo('Quality Control', TagColor.teal),
        TagInfo('Reparação', TagColor.teal),
        TagInfo('Multi-marca', TagColor.teal),
      ],
    ),
  ),

  // 5: scene_4 — Electronics & IoT
  (
    path: 'scene_4.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.04.title',
      tags: [
        TagInfo('SmartHome', TagColor.teal),
        TagInfo('BluSensor', TagColor.teal),
        TagInfo('DrVidaPocket', TagColor.teal),
        TagInfo('Arduino', TagColor.teal),
        TagInfo('ESP32', TagColor.teal),
        TagInfo('PCB', TagColor.teal),
        TagInfo('C/C++', TagColor.teal),
      ],
    ),
  ),

  // 6: scene_5 — Drone Build
  (
    path: 'scene_5.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.05.title',
      tags: [
        TagInfo('1.º Faqtos', TagColor.teal),
        TagInfo('2.º RoboParty', TagColor.teal),
        TagInfo('MakerFair', TagColor.teal),
        TagInfo('Futurália', TagColor.teal),
        TagInfo('15+ projetos', TagColor.teal),
      ],
    ),
  ),

  // 7: scene_6_and_7 — Apps & Backend
  (
    path: 'scene_6_and_7.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.07.title',
      subtitleKey: 'scene.07.subtitle',
      tags: [
        TagInfo('Flutter', TagColor.blue),
        TagInfo('Dart', TagColor.blue),
        TagInfo('.NET Core', TagColor.blue),
        TagInfo('C#', TagColor.blue),
        TagInfo('SQL Server', TagColor.blue),
        TagInfo('Firebase', TagColor.blue),
        TagInfo('Docker', TagColor.blue),
      ],
    ),
  ),

  // 8: scene_8_and_9 — AI Skills
  (
    path: 'scene_8_and_9.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.09.title',
      subtitleKey: 'scene.09.subtitle',
      tags: [
        TagInfo('OpenAI', TagColor.pink),
        TagInfo('LangChain', TagColor.pink),
        TagInfo('RAG', TagColor.pink),
        TagInfo('MCP', TagColor.pink),
        TagInfo('VectorDB', TagColor.pink),
        TagInfo('Fine-tuning', TagColor.pink),
        TagInfo('LoRA', TagColor.pink),
        TagInfo('N8N', TagColor.pink),
        TagInfo('Azure OpenAI', TagColor.pink),
      ],
    ),
  ),

  // 9: scene_10 — The Dream
  (
    path: 'scene_10.mp4',
    overlay: SceneOverlay(
      titleKey: 'scene.10.title',
      subtitleKey: 'scene.10.subtitle',
    ),
  ),
];
