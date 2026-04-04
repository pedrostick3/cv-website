import 'package:flutter_test/flutter_test.dart';
import 'package:cv_pedro/main.dart';

void main() {
  testWidgets('App boots without error', (WidgetTester tester) async {
    await tester.pumpWidget(const CvApp());
    // Just verify the app renders
    expect(find.text('Pedro'), findsAny);
  });
}
