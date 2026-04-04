import 'package:flutter/material.dart';

import 'config/theme.dart';
import 'screens/home_screen.dart';
import 'services/l10n_service.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CvApp());
}

class CvApp extends StatefulWidget {
  const CvApp({super.key});

  @override
  State<CvApp> createState() => _CvAppState();
}

class _CvAppState extends State<CvApp> {
  final _l10n = L10nService();

  @override
  void initState() {
    super.initState();
    _l10n.init();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pedro Dionísio — AI Engineer & Full-Stack Developer',
      debugShowCheckedModeBanner: false,
      theme: buildAppTheme(),
      home: HomeScreen(l10n: _l10n),
    );
  }
}
