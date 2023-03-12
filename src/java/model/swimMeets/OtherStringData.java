

package model.swimMeets;

public class OtherStringData {
    
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
    
    // default constructor leaves all data members with empty string (Nothing null).
    public OtherStringData() {
    }
    
    public int getCharacterCount() {
        String s = this.swimMeetsId + this.meetsName + this.meetsDate + this.meetsPlace + this.image
                + this.qualification + this.committed + this.committed2 + this.meetsFee + this.webuserID + this.userEmail;
        return s.length();
    }

    public String toString() {
        return "Swim Meet ID:" + this.swimMeetsId
                + ", Meet's Name: " + this.meetsName
                + ", Meets's Date: " + this.meetsDate
                + ", Meet's Place: " + this.meetsPlace
                + ", Image: " + this.image
                + ", Qualifications (Yes or No): " + this.qualification
                + ", Committed (Yes or No): " + this.committed
                + ", Committed2: " + this.committed2
                + ", meetsFee: " + this.meetsFee
                + ", Web User ID: " + this.webuserID
                + ", Email: " + this.userEmail;
    }
}
