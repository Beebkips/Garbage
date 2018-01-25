public class Asdf {
    String myString = "This is my string";
    int myField;

    // This is constructor
    public Asdf() {
        // System.out.println("I am constructing the Asdf object");
        // System.out.println("I am initializing the field myField to 0");
        myField = 0;
        // System.out.println("I am don making the object Asdf");
    }

    public void setMyString(String theString) {
        myString = theString;
        warning();
    }

    public void printmyString() {
        System.out.println(myString);
    }

    public void warning() {
        System.out.println("This is another method");
    }

    public void derp() {
        System.out.println("This is an infinite loop, derp");
        herp();
    }

    public void herp() {
        System.out.println("This is an infinite loop, herp");
        derp();
    }

    public static void main(String[] theArgs) {
        Asdf myObject = new Asdf();
        // myObject.printmyString();
        // myObject.setMyString("This is a new string");
        // myObject.printmyString();
        myObject.derp();
    }
}