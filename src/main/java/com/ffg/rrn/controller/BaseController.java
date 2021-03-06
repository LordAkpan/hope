package com.ffg.rrn.controller;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;

import com.ffg.rrn.utils.WebUtils;

public class BaseController {

    protected String populateSCinModel(Model model, Principal principal) {

        User loggedinUser = (User) ((Authentication) principal).getPrincipal();
        String serviceCordInfo = WebUtils.toString(loggedinUser);
        model.addAttribute("serviceCordInfo", serviceCordInfo);

		String grantOnProperty = WebUtils.grantOnProperty(loggedinUser).replaceAll("ROLE_", "");

		model.addAttribute("grantOnProperty", grantOnProperty.equals("null") ? "All" : grantOnProperty);
		model.addAttribute("isAdmin", WebUtils.isAdmin(loggedinUser));
		model.addAttribute("userName", loggedinUser.getUsername());
        return loggedinUser.getUsername();
    }

    protected String getSessionUsername(){
        UserDetails userDetails= (UserDetails)(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        if(userDetails==null){
            throw new RuntimeException("Session might be timed out. Login again please.");
        }
        return userDetails.getUsername();
    }

}
