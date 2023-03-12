
package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.swimMeets.*;

// classes in my project
import dbUtils.*;

public class SwimMeetsView 
{      
    public static OtherStringDataList getAllSwimMeets(DbConn dbc) 
    {
        // sdl will be an empty array and DbError with "" 
        OtherStringDataList sdl = new OtherStringDataList();
        
        // sd will have all of it's fields initialized to ""
        OtherStringData sd = new OtherStringData();
        
        try {
            String sql = "SELECT swim_meets_id, swim_meets_name, swim_meets_date, swim_meets_place, swim_meets_img, swim_meets_qualification, swim_meets_committed, swim_meets_fee, "
                    + "swim_meets.web_user_id, user_email "
                    + "FROM web_user, swim_meets where swim_meets.web_user_id = web_user.web_user_id "
                    + "ORDER BY swim_meets_id ";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new OtherStringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.swimMeetsId = FormatUtils.plainInteger(results.getObject("swim_meets_id"));
                sd.meetsName = FormatUtils.formatString(results.getObject("swim_meets_name"));
                sd.meetsDate = FormatUtils.formatDate(results.getObject("swim_meets_date"));
                sd.meetsPlace = FormatUtils.formatString(results.getObject("swim_meets_place"));
                sd.image = FormatUtils.formatString(results.getObject("swim_meets_img"));
                sd.qualification = FormatUtils.formatString(results.getObject("swim_meets_qualification"));
                sd.committed = FormatUtils.formatString(results.getObject("swim_meets_committed"));
                sd.meetsFee = FormatUtils.formatDollar(results.getObject("swim_meets_fee"));
                sd.webuserID = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in WebUserView.getAllSwimMeets(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
