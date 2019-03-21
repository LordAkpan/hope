/**
 * 
 */
package com.ffg.rrn.controller;

import com.ffg.rrn.model.Resident;
import com.ffg.rrn.model.ServiceCoordinator;
import com.ffg.rrn.service.ResidentServiceImpl;
import com.ffg.rrn.service.ServiceCoordinatorServiceImpl;
import com.ffg.rrn.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

/**
 * @author FFGRRNTeam
 *
 */
@Controller
public class ResidentController {
	
	@Autowired
	private ResidentServiceImpl residentService;

	@Autowired
	private ServiceCoordinatorServiceImpl serviceCoordinatorService;

	@RequestMapping(value = "/getResidentById",  method = { RequestMethod.GET, RequestMethod.POST })
	public String residents(@RequestParam("residentId") Long residentId, Model model, Principal principal) throws Exception{

		// (1) (en)
		// After user login successfully.
		String serviceCoord = null;
		if (principal != null) {
			serviceCoord = populateSCinModel(model, principal);
		}

		Resident resident  = residentService.getResidentById(residentId, serviceCoord);
		resident = residentService.getAllQuestionnaire(resident);

		model.addAttribute("resident", resident);
		model.addAttribute("message", "Save new resident first or load existing Resident from All Resident Tab.");

		return "residentPage";

	}

	@RequestMapping(value = "/newResident", method = RequestMethod.GET)
	public String residents(Model model, Principal principal) throws Exception{

		// (1) (en)
		// After user login successfully.
		String serviceCoord = null;
		if (principal != null) {
			serviceCoord = populateSCinModel(model, principal);
		}

		Resident resident  = residentService.getResidentById(0l, serviceCoord);
		resident = residentService.getAllQuestionnaire(resident);

		model.addAttribute("resident", resident);
		model.addAttribute("message", "Please select resident from All Resident Table first");

		return "residentPage";

	}

	@RequestMapping(value = "/allResident", method = RequestMethod.GET)
	public String getAllResidents(Model model, Principal principal) throws Exception{

		// (1) (en)
		// After user login successfully.

		if (principal != null) {
			populateSCinModel(model, principal);
		}

		return "allResident";
	}

	@PostMapping("/saveResident")
	public String signup(@Valid @ModelAttribute Resident resident, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			setupDropdownList(resident);
			return "residentPage";
		}
		//This will be new ResidentId always
		Long residentId = residentService.saveResident(resident);

		return "allResident";
	}

	private String populateSCinModel(Model model, Principal principal) {

		User loggedinUser = (User) ((Authentication) principal).getPrincipal();
		String serviceCordInfo = WebUtils.toString(loggedinUser);
		model.addAttribute("serviceCordInfo", serviceCordInfo);
		return loggedinUser.getUsername();
	}

	private void setupDropdownList(Resident resident){
		resident.setPropertyList(residentService.getAllProperty());
		resident.setRefList(residentService.getAllReferral());
		resident.setAtList(residentService.getAllAType());
	}
}