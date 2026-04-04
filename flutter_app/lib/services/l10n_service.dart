import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Simple JSON-based i18n service matching the original website's approach.
class L10nService extends ChangeNotifier {
  Map<String, dynamic> _translations = {};
  String _currentLang = 'pt';

  String get currentLang => _currentLang;

  /// Load initial language (defaults to PT).
  Future<void> init() async {
    await setLanguage('pt');
  }

  /// Switch language and notify listeners.
  Future<void> setLanguage(String lang) async {
    try {
      final jsonStr = await rootBundle.loadString('assets/l10n/$lang.json');
      _translations = json.decode(jsonStr) as Map<String, dynamic>;
      _currentLang = lang;
      notifyListeners();
    } catch (e) {
      debugPrint('[L10n] Failed to load $lang: $e');
    }
  }

  /// Get a translated string by dot-separated key path.
  /// E.g. t('scene.01.greeting') → "Olá, eu sou o"
  String t(String key) {
    final parts = key.split('.');
    dynamic current = _translations;
    for (final part in parts) {
      if (current is Map<String, dynamic> && current.containsKey(part)) {
        current = current[part];
      } else {
        return key; // fallback: return the key itself
      }
    }
    return current is String ? current : key;
  }
}
