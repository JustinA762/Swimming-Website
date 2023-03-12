
package model.swimMeets;
import java.util.ArrayList;

/**
 *
 * @author jpax2
 */
public class OtherStringDataList {
    
    public String dbError = "";
    public ArrayList<OtherStringData> swimMeetsList = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public OtherStringDataList() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(OtherStringData stringData) {
        this.swimMeetsList.add(stringData);
    }
}
