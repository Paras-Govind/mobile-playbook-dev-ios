/*  https://frida.re/docs/examples/ios/
 *  Sent a Hello World to your app:
 *      helloWorld()
 */

function helloWorld()
{
// Defining a Block that will be passed as handler parameter to +[UIAlertAction actionWithTitle:style:handler:]
var handler = new ObjC.Block({
    retType: 'void',
    argTypes: ['object'],
    implementation: function () {
    }
  });
  
  // Import ObjC classes
  var UIAlertController = ObjC.classes.UIAlertController;
  var UIAlertAction = ObjC.classes.UIAlertAction;
  var UIApplication = ObjC.classes.UIApplication;
  
  // Using Grand Central Dispatch to pass messages (invoke methods) in application's main thread
  ObjC.schedule(ObjC.mainQueue, function () {
    // Using integer numerals for preferredStyle which is of type enum UIAlertControllerStyle
    var alert = UIAlertController.alertControllerWithTitle_message_preferredStyle_('Frida', 'Hello from Frida', 1);
    // Again using integer numeral for style parameter that is enum
    var defaultAction = UIAlertAction.actionWithTitle_style_handler_('OK', 0, handler);
    alert.addAction_(defaultAction);
    // Instead of using `ObjC.choose()` and looking for UIViewController instances
    // on the heap, we have direct access through UIApplication:
    UIApplication.sharedApplication().keyWindow().rootViewController().presentViewController_animated_completion_(alert, true, NULL);
  })

}

