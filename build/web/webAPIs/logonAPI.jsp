<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    String email = request.getParameter("user_email"); // Getting the email parameters
    String password = request.getParameter("user_password"); // Getting the password parameters
    if ((email == null) || (password == null)) 
    {
        sd.errorMsg = "Cannot search for user - 'user_email' and 'user_password' most be URL params";
    } 
    else 
    {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) 
        { 
            System.out.println("*** Ready to call DbMods.findForLogon");
            sd = DbMods.findForLogon(dbc, email, password);  // In DbMods
            if (sd.webUserId.length() > 0)
            {
                session.setAttribute("webUser", sd); // Setting attribute
            }
            else 
            {
                session.invalidate();
            }
        }
        dbc.close(); 
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>