package model.swimMeets;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.ValidationUtils;
import dbUtils.PrepStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class OtherDbMods 
{
    private static OtherStringData validate(OtherStringData inputData) {

        OtherStringData errorMsgs = new OtherStringData();

        /* Useful to copy field names from OtherStringData as a reference
    public String swimMeetsId = "";
    public String meetsName = "";
    public String meetsDate = "";
    public String meetsPlace = "";
    public String image = "";
    public String qualification = "";
    public String committed = "";  
    public String committed2 = "";
    public String meetsFee = "";
    public String webuserID = ""; // Foreign Key
    public String userEmail = ""; // getting it from joined user_role table.

    public String errorMsg = "";
         */
        // Validation
        errorMsgs.meetsName = ValidationUtils.stringValidationMsg(inputData.meetsName, 45, true);
        errorMsgs.meetsDate = ValidationUtils.dateValidationMsg(inputData.meetsDate, true);
        errorMsgs.meetsPlace = ValidationUtils.stringValidationMsg(inputData.meetsPlace, 45, true);
        
        errorMsgs.image = ValidationUtils.stringValidationMsg(inputData.image, 300, false);
        
        errorMsgs.qualification = ValidationUtils.stringValidationMsg(inputData.qualification, 45, true);
        errorMsgs.committed = ValidationUtils.stringValidationMsg(inputData.committed, 45, true);

        if (inputData.committed.compareTo(inputData.committed2) != 0) { // case sensative comparison
            errorMsgs.committed2 = "Both committed must match";
        }

        errorMsgs.meetsFee = ValidationUtils.decimalValidationMsg(inputData.meetsFee, false);
        errorMsgs.webuserID = ValidationUtils.integerValidationMsg(inputData.webuserID, true);
        //errorMsgs.userEmail = ValidationUtils.stringValidationMsg(inputData.userEmail, 45, true);

        return errorMsgs;
    } // validate 
    
    public static String delete(String swimMeetsId, DbConn dbc) {

        if (swimMeetsId == null) {
            return "Error in modelwebUser.DbMods.delete: cannot delete web_user record because 'userId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM swim_meets WHERE swim_meets_id=?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, swimMeetsId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with swim_meets_id " + swimMeetsId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
    
    public static OtherStringData update(OtherStringData inputData, DbConn dbc) {

        OtherStringData errorMsgs = new OtherStringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE swim_meets SET swim_meets_name=?, swim_meets_date=?, swim_meets_place=?, swim_meets_img=?, swim_meets_qualification=?, swim_meets_committed=?, swim_meets_fee=?, web_user_id=? "
                    + "WHERE swim_meets_id=?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.meetsName);
            pStatement.setDate(2, ValidationUtils.dateConversion(inputData.meetsDate));
            pStatement.setString(3, inputData.meetsPlace);
            pStatement.setString(4, inputData.image);
            pStatement.setString(5, inputData.qualification);
            pStatement.setString(6, inputData.committed);
            pStatement.setBigDecimal(7, ValidationUtils.decimalConversion(inputData.meetsFee));
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.webuserID));
            //pStatement.setString(9, inputData.userEmail);
            pStatement.setInt(9, ValidationUtils.integerConversion(inputData.swimMeetsId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    public static OtherStringData insert(OtherStringData inputData, DbConn dbc) {

        OtherStringData errorMsgs = new OtherStringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT swim_meets_id, user_email, user_password, swim_meets_name, swim_meets_date, swim_meets_place, swim_meets_img, swim_meets_qualification, swim_meets_committed, swim_meets_fee, "
                    + "swim_meets.web_user_id "
                    + "FROM web_user, swim_meets where swim_meets.web_user_id = web_user.web_user_id "
                    + "ORDER BY swim_meets_id ";  // you always want to order by something, not just random order.
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO swim_meets (swim_meets_name, swim_meets_date, swim_meets_place, swim_meets_img, swim_meets_qualification, swim_meets_committed, swim_meets_fee, web_user_id) "
                    + "values (?,?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.meetsName);
            pStatement.setDate(2, ValidationUtils.dateConversion(inputData.meetsDate));
            pStatement.setString(3, inputData.meetsPlace);
            pStatement.setString(4, inputData.image);
            pStatement.setString(5, inputData.qualification);
            pStatement.setString(6, inputData.committed);
            pStatement.setBigDecimal(7, ValidationUtils.decimalConversion(inputData.meetsFee));
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.webuserID));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Swim Meet ID";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That swim meet name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
    public static OtherStringData findById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        OtherStringData sd = new OtherStringData();
        try {
            String sql = "SELECT swim_meets_id, swim_meets_name, swim_meets_date, swim_meets_place, swim_meets_img, swim_meets_qualification, swim_meets_committed, swim_meets_fee, "
                    + "swim_meets.web_user_id, user_email "
                    + "FROM swim_meets, web_user WHERE swim_meets.web_user_id = web_user.web_user_id "
                    + "AND swim_meets_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.swimMeetsId = FormatUtils.plainInteger(results.getObject("swim_meets_id"));
                sd.meetsName = FormatUtils.formatString(results.getObject("swim_meets_name"));
                sd.meetsDate = FormatUtils.formatDate(results.getObject("swim_meets_date"));
                sd.meetsPlace = FormatUtils.formatString(results.getObject("swim_meets_place"));
                sd.image = FormatUtils.formatString(results.getObject("swim_meets_img"));
                sd.qualification = FormatUtils.formatString(results.getObject("swim_meets_qualification"));
                sd.committed = FormatUtils.formatString(results.getObject("swim_meets_committed"));
                sd.meetsFee = FormatUtils.formatDollar(results.getObject("swim_meets_fee"));
                sd.webuserID = FormatUtils.formatInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));

            } else {
                sd.errorMsg = "Meet Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
    
}
