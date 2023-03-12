<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.swimMeets.*" %> 
<%@page language="java" import="view.SwimMeetsView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    OtherStringData sd = new OtherStringData();
    String searchId = request.getParameter("meetsId");
    if (searchId == null) {
        sd.errorMsg = "Cannot search for user - 'meetsId' most be supplied";
    } else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) { 
            System.out.println("*** Ready to call DbMods.findById");
            sd = OtherDbMods.findById(dbc, searchId);   
        }
        dbc.close(); 
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>