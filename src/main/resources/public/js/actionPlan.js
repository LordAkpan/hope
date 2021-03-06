window.onbeforeprint = function() {
   
    $("#_poActionHousingPrint").text($("#_planOfActionHousing").val());
    $("#_planDetailHousingPrint").text($("#_planDetailsHousing").val());
    $("#_referralPartnerHousingPrint").text($("#_referralPartnerHousing").val());
    $("#_aoHousingPrint").text($("#_aoHousing").val());
    $("#_aoDateHousingPrint").text($("#_inputDateTextAnticipatedHousing").val());
    
    
    $("#_poActionMMPrint").text($("#_planOfActionMM").val());
    $("#_planDetailMMPrint").text($("#_planDetailsMM").val());
    $("#_referralPartnerMMPrint").text($("#_referralPartnerMM").val());
    $("#_aoMMPrint").text($("#_aoMM").val());
    $("#_aoDateMMPrint").text($("#_inputDateTextAnticipatedMM").val());
    
    $("#_poActionEmpPrint").text($("#_planOfActionEmp").val());
    $("#_planDetailEmpPrint").text($("#_planDetailsEmp").val());
    $("#_referralPartnerEmpPrint").text($("#_referralPartnerEmp").val());
    $("#_aoEmpPrint").text($("#_aoEmp").val());
    $("#_aoDateEmpPrint").text($("#_inputDateTextAnticipatedEmp").val());
    
    $("#_poActionEduPrint").text($("#_planOfActionEdu").val());
    $("#_planDetailEduPrint").text($("#_planDetailsEdu").val());
    $("#_referralPartnerEduPrint").text($("#_referralPartnerEdu").val());
    $("#_aoEduPrint").text($("#_aoEdu").val());
    $("#_aoDateEduPrint").text($("#_inputDateTextAnticipatedEdu").val());
    
    $("#_poActionNSPrint").text($("#_planOfActionNS").val());
    $("#_planDetailNSPrint").text($("#_planDetailsNS").val());
    $("#_referralPartnerNSPrint").text($("#_referralPartnerNS").val());
    $("#_aoNSPrint").text($("#_aoNS").val());
    $("#_aoDateNSPrint").text($("#_inputDateTextAnticipatedNS").val());
    
    $("#_poActionHHPrint").text($("#_planOfActionHH").val());
    $("#_planDetailHHPrint").text($("#_planDetailsHH").val());
    $("#_referralPartnerHHPrint").text($("#_referralPartnerHH").val());
    $("#_aoHHPrint").text($("#_aoHH").val());
    $("#_aoDateHHPrint").text($("#_inputDateTextAnticipatedHH").val());
    
    $("#_followUpNotesPrint").text($("#_followUpNotes").val());
    
    $("#_outAchHousing_P").text($("#_outAchHousing").val());
    $("#_achGoalHousing_P").text($("#_achGoalHousing").val());
    $("#_inputDateTextHousing_P").text($("#_inputDateTextHousing").val());
    
    $("#_outAchMM_P").text($("#_outAchMM").val());
    $("#_achGoalMM_P").text($("#_achGoalMM").val());
    $("#_inputDateTextMM_P").text($("#_inputDateTextMM").val());
    
    $("#_outAchEmp_P").text($("#_outAchEmp").val());
    $("#_achGoalEmp_P").text($("#_achGoalEmp").val());
    $("#_inputDateTextEmp_P").text($("#_inputDateTextEmp").val());
    
    $("#_outAchEdu_P").text($("#_outAchEdu").val());
    $("#_achGoalEdu_P").text($("#_achGoalEdu").val());
    $("#_inputDateTextEdu_P").text($("#_inputDateTextEdu").val());
    
    $("#_outAchNS_P").text($("#_outAchNS").val());
    $("#_achGoalNS_P").text($("#_achGoalNS").val());
    $("#_inputDateTextNS_P").text($("#_inputDateTextNS").val());
    
    $("#_outAchHH_P").text($("#_outAchHH").val());
    $("#_achGoalHH_P").text($("#_achGoalHH").val());
    $("#_inputDateTextHH_P").text($("#_inputDateTextHH").val());
    
    
    
    
   
};
    
jQuery(document).ready(function() {

    
    validateAndShowMessage();  
    var resId = jQuery.urlParam('residentId');
    var onThisDate = jQuery.urlParam('onThisDate');
    var currHref = jQuery("#_loadActionPlan").attr('href');
    var prefix = currHref.split('&');
    
    if(jQuery("#_dates").val() != 'new') {
	jQuery('#_loadActionPlan').attr('href', prefix[0] + '&residentId='+resId + '&onThisDate='+onThisDate );
    }else{	
	jQuery('#_loadActionPlan').attr('href', prefix[0] + '&residentId='+resId);
    }

    jQuery.ajax({
	type : "POST",
	contentType : "application/json",
	url : "/getAllLatestScoreGoal?residentId=" + jQuery('#_residentIdText').text(),
	dataType : 'json',
	cache : false,
	timeout : 600000,
	success : function(data) {
	    // Following method highlight background in actionPlan SSM Grid as
	    // per Current Score of resident.
	    highlightSSMGridAsPerCurrentScore(data);
	    // This method is useful in case of modify use case
	    populateEachActionPlanFromJsonData();

	},
	error : function(e) {
	    console.log("ERROR : ", e);
	}
    });

    // set current date
    $("#_currentDate").text(new Date().toLocaleDateString());
    
    
    
});

function buildAchorTagForSelectedDate(that, residentId){
    
    var resId = jQuery.urlParam('residentId');    
    var suffix = '&residentId='+residentId+'&onThisDate='+that.value;
    var currHref = jQuery("#_loadActionPlan").attr('href');
    var prefix = currHref.split('&');
    
    if(that.value != 'new'){      
        jQuery('#_loadActionPlan').attr('href', prefix[0] + suffix);
    }else{
	jQuery('#_loadActionPlan').attr('href', prefix[0] + '&residentId='+resId);
    }
    
}

/**
 * This method helps in populates action plan fields for existing saved actionPlan. Get Values from database and put it in each Box
 */
function populateEachActionPlanFromJsonData() {
 

    if (jQuery("#_planOfActionString").val() != '') {
	var planOfActionJson = JSON.parse(jQuery("#_planOfActionString").val());

	jQuery("#_planOfActionHousing").val(planOfActionJson["HOUSING"]);
	jQuery("#_planOfActionMM").val(planOfActionJson["MONEY MANAGEMENT"]);
	jQuery("#_planOfActionEmp").val(planOfActionJson["EMPLOYMENT"]);
	jQuery("#_planOfActionEdu").val(planOfActionJson["EDUCATION"]);
	jQuery("#_planOfActionNS").val(planOfActionJson["NETWORK SUPPORT"]);
	jQuery("#_planOfActionHH").val(planOfActionJson["HOUSEHOLD MANAGEMENT"]);

    }
    
    if (jQuery("#_planDetailsString").val() != '') {
	
	var planDetailsJson = JSON.parse(jQuery("#_planDetailsString").val());
	
	jQuery("#_planDetailsHousing").val(planDetailsJson["HOUSING"]);
	jQuery("#_planDetailsMM").val(planDetailsJson["MONEY MANAGEMENT"]);
	jQuery("#_planDetailsEmp").val(planDetailsJson["EMPLOYMENT"]);
	jQuery("#_planDetailsEdu").val(planDetailsJson["EDUCATION"]);
	jQuery("#_planDetailsNS").val(planDetailsJson["NETWORK SUPPORT"]);
	jQuery("#_planDetailsHH").val(planDetailsJson["HOUSEHOLD MANAGEMENT"]);
	
    }
    
    if (jQuery("#_referralPartnerString").val() != '') {
	
	var planDetailsJson = JSON.parse(jQuery("#_referralPartnerString").val());
	
	jQuery("#_referralPartnerHousing").val(planDetailsJson["HOUSING"]);
	jQuery("#_referralPartnerMM").val(planDetailsJson["MONEY MANAGEMENT"]);
	jQuery("#_referralPartnerEmp").val(planDetailsJson["EMPLOYMENT"]);
	jQuery("#_referralPartnerEdu").val(planDetailsJson["EDUCATION"]);
	jQuery("#_referralPartnerNS").val(planDetailsJson["NETWORK SUPPORT"]);
	jQuery("#_referralPartnerHH").val(planDetailsJson["HOUSEHOLD MANAGEMENT"]);
	
    }


    if (jQuery("#_anticipatedOutcomeString").val() != '') {
	var anticipatedOutcomeJson = JSON.parse(jQuery("#_anticipatedOutcomeString").val());
	
	//Following If else logic is because even though SC deletes values from referral form for anticipated Outcomes, existing historical values should popup again in this dropdown
	if(jQuery("#_aoHousing:has(option[value='"+anticipatedOutcomeJson["HOUSING"]+"'])").length > 0 || anticipatedOutcomeJson["HOUSING"] == ''){
	    jQuery("#_aoHousing").val(anticipatedOutcomeJson["HOUSING"]);
	}else{
	    jQuery("#_aoHousing").append(jQuery('<option></option>').attr("value", anticipatedOutcomeJson["HOUSING"]).text(anticipatedOutcomeJson["HOUSING"]));
	    jQuery("#_aoHousing").val(anticipatedOutcomeJson["HOUSING"]);
	}
	
	if(jQuery("#_aoMM:has(option[value='"+anticipatedOutcomeJson["MONEY MANAGEMENT"]+"'])").length > 0 || anticipatedOutcomeJson["MONEY MANAGEMENT"] == ''){
	    jQuery("#_aoMM").val(anticipatedOutcomeJson["MONEY MANAGEMENT"]);
	}else{
	    jQuery("#_aoMM").append(jQuery('<option></option>').attr("value", anticipatedOutcomeJson["MONEY MANAGEMENT"]).text(anticipatedOutcomeJson["MONEY MANAGEMENT"]));
	    jQuery("#_aoMM").val(anticipatedOutcomeJson["MONEY MANAGEMENT"]);
	}
	
	if(jQuery("#_aoEmp:has(option[value='"+anticipatedOutcomeJson["EMPLOYMENT"]+"'])").length > 0 || anticipatedOutcomeJson["EMPLOYMENT"] == ''){
	    jQuery("#_aoEmp").val(anticipatedOutcomeJson["EMPLOYMENT"]);
	}else{
	    jQuery("#_aoEmp").append(jQuery('<option></option>').attr("value", anticipatedOutcomeJson["EMPLOYMENT"]).text(anticipatedOutcomeJson["EMPLOYMENT"]));
	    jQuery("#_aoEmp").val(anticipatedOutcomeJson["EMPLOYMENT"]);
	}
	
	if(jQuery("#_aoEdu:has(option[value='"+anticipatedOutcomeJson["EDUCATION"]+"'])").length > 0 || anticipatedOutcomeJson["EDUCATION"] == ''){
	    jQuery("#_aoEdu").val(anticipatedOutcomeJson["EDUCATION"]);
	}else{
	    jQuery("#_aoEdu").append(jQuery('<option></option>').attr("value", anticipatedOutcomeJson["EDUCATION"]).text(anticipatedOutcomeJson["EDUCATION"]));
	    jQuery("#_aoEdu").val(anticipatedOutcomeJson["EDUCATION"]);
	}
	
	if(jQuery("#_aoNS:has(option[value='"+anticipatedOutcomeJson["NETWORK SUPPORT"]+"'])").length > 0 || anticipatedOutcomeJson["NETWORK SUPPORT"] == ''){
	    jQuery("#_aoNS").val(anticipatedOutcomeJson["NETWORK SUPPORT"]);
	}else{
	    jQuery("#_aoNS").append(jQuery('<option></option>').attr("value", anticipatedOutcomeJson["NETWORK SUPPORT"]).text(anticipatedOutcomeJson["NETWORK SUPPORT"]));
	    jQuery("#_aoNS").val(anticipatedOutcomeJson["NETWORK SUPPORT"]);
	}
	
	if(jQuery("#_aoHH:has(option[value='"+anticipatedOutcomeJson["HOUSEHOLD MANAGEMENT"]+"'])").length > 0 || anticipatedOutcomeJson["HOUSEHOLD MANAGEMENT"] == ''){
	    jQuery("#_aoHH").val(anticipatedOutcomeJson["HOUSEHOLD MANAGEMENT"]);
	}else{
	    jQuery("#_aoHH").append(jQuery('<option></option>').attr("value", anticipatedOutcomeJson["HOUSEHOLD MANAGEMENT"]).text(anticipatedOutcomeJson["HOUSEHOLD MANAGEMENT"]));
	    jQuery("#_aoHH").val(anticipatedOutcomeJson["HOUSEHOLD MANAGEMENT"]);
	}
	
    }
    
    if (jQuery("#_anticipatedDateString").val() != '') {
	var completionDateJson = JSON.parse(jQuery("#_anticipatedDateString").val());

	jQuery("#_inputDateTextAnticipatedHousing").val(completionDateJson["HOUSING"]);
	jQuery("#_inputDateTextAnticipatedMM").val(completionDateJson["MONEY MANAGEMENT"]);
	jQuery("#_inputDateTextAnticipatedEmp").val(completionDateJson["EMPLOYMENT"]);
	jQuery("#_inputDateTextAnticipatedEdu").val(completionDateJson["EDUCATION"]);
	jQuery("#_inputDateTextAnticipatedNS").val(completionDateJson["NETWORK SUPPORT"]);
	jQuery("#_inputDateTextAnticipatedHH").val(completionDateJson["HOUSEHOLD MANAGEMENT"]);

    }

    if (jQuery("#_outcomesAchievedString").val() != '') {
	var outcomesAchievedJson = JSON.parse(jQuery("#_outcomesAchievedString").val());

	jQuery("#_outAchHousing").val(outcomesAchievedJson["HOUSING"]);
	jQuery("#_outAchMM").val(outcomesAchievedJson["MONEY MANAGEMENT"]);
	jQuery("#_outAchEmp").val(outcomesAchievedJson["EMPLOYMENT"]);
	jQuery("#_outAchEdu").val(outcomesAchievedJson["EDUCATION"]);
	jQuery("#_outAchNS").val(outcomesAchievedJson["NETWORK SUPPORT"]);
	jQuery("#_outAchHH").val(outcomesAchievedJson["HOUSEHOLD MANAGEMENT"]);

    }
    
    if (jQuery("#_achievedGoalString").val() != '') {
	var achievedGoalJson = JSON.parse(jQuery("#_achievedGoalString").val());

	jQuery("#_achGoalHousing").val(achievedGoalJson["HOUSING"]);
	jQuery("#_achGoalMM").val(achievedGoalJson["MONEY MANAGEMENT"]);
	jQuery("#_achGoalEmp").val(achievedGoalJson["EMPLOYMENT"]);
	jQuery("#_achGoalEdu").val(achievedGoalJson["EDUCATION"]);
	jQuery("#_achGoalNS").val(achievedGoalJson["NETWORK SUPPORT"]);
	jQuery("#_achGoalHH").val(achievedGoalJson["HOUSEHOLD MANAGEMENT"]);

    }
    
    if (jQuery("#_completionDateString").val() != '') {
	var completionDateJson = JSON.parse(jQuery("#_completionDateString").val());

	jQuery("#_inputDateTextHousing").val(completionDateJson["HOUSING"]);
	jQuery("#_inputDateTextMM").val(completionDateJson["MONEY MANAGEMENT"]);
	jQuery("#_inputDateTextEmp").val(completionDateJson["EMPLOYMENT"]);
	jQuery("#_inputDateTextEdu").val(completionDateJson["EDUCATION"]);
	jQuery("#_inputDateTextNS").val(completionDateJson["NETWORK SUPPORT"]);
	jQuery("#_inputDateTextHH").val(completionDateJson["HOUSEHOLD MANAGEMENT"]);

    }

    if (jQuery("#_rr").val() != '') {
	var referralReason = JSON.parse(jQuery("#_rr").val());
	var row = '';

	jQuery.each(referralReason, function(idx, obj) {

	    if (!(obj == 'true' || obj == 'false' || obj == '')) {
		row = row + '<span>' + idx + '&nbsp;' + obj + '</span> <br/>'
	    } else if (obj == 'true') {
		row = row + '<span>' + idx + '&nbsp;</span> <br/>';
	    }

	});

	jQuery("#_refReasons").html(row);
    }

}

function highlightSSMGridAsPerCurrentScore(data) {

    if (data["HOUSING"][0] == '1') {
	jQuery("#_housingSSM1").addClass('danger');
    } else if (data["HOUSING"][0] == '2') {
	jQuery("#_housingSSM2").addClass('warning');
    } else if (data["HOUSING"][0] == '3') {
	jQuery("#_housingSSM3").addClass('info');
    } else if (data["HOUSING"][0] == '4') {
	jQuery("#_housingSSM4").addClass('success');
    } else if (data["HOUSING"][0] == '5') {
	jQuery("#_housingSSM5").addClass('success');
    }

    if (data["MONEY MANAGEMENT"][0] == '1') {
	jQuery("#_moneySSM1").addClass('danger');
    } else if (data["MONEY MANAGEMENT"][0] == '2') {
	jQuery("#_moneySSM2").addClass('warning');
    } else if (data["MONEY MANAGEMENT"][0] == '3') {
	jQuery("#_moneySSM3").addClass('info');
    } else if (data["MONEY MANAGEMENT"][0] == '4') {
	jQuery("#_moneySSM4").addClass('success');
    } else if (data["MONEY MANAGEMENT"][0] == '5') {
	jQuery("#_moneySSM5").addClass('success');
    }

    if (data["EDUCATION"][0] == '1') {
	jQuery("#_educationSSM1").addClass('danger');
    } else if (data["EDUCATION"][0] == '2') {
	jQuery("#_educationSSM2").addClass('warning');
    } else if (data["EDUCATION"][0] == '3') {
	jQuery("#_educationSSM3").addClass('info');
    } else if (data["EDUCATION"][0] == '4') {
	jQuery("#_educationSSM4").addClass('success');
    } else if (data["EDUCATION"][0] == '5') {
	jQuery("#_educationSSM5").addClass('success');
    }

    if (data["EMPLOYMENT"][0] == '1') {
	jQuery("#_employmentSSM1").addClass('danger');
    } else if (data["EMPLOYMENT"][0] == '2') {
	jQuery("#_employmentSSM2").addClass('warning');
    } else if (data["EMPLOYMENT"][0] == '3') {
	jQuery("#_employmentSSM3").addClass('info');
    } else if (data["EMPLOYMENT"][0] == '4') {
	jQuery("#_employmentSSM4").addClass('success');
    } else if (data["EMPLOYMENT"][0] == '5') {
	jQuery("#_employmentSSM5").addClass('success');
    }

    if (data["NETWORK SUPPORT"][0] == '1') {
	jQuery("#_networkSSM1").addClass('danger');
    } else if (data["NETWORK SUPPORT"][0] == '2') {
	jQuery("#_networkSSM2").addClass('warning');
    } else if (data["NETWORK SUPPORT"][0] == '3') {
	jQuery("#_networkSSM3").addClass('info');
    } else if (data["NETWORK SUPPORT"][0] == '4') {
	jQuery("#_networkSSM4").addClass('success');
    } else if (data["NETWORK SUPPORT"][0] == '5') {
	jQuery("#_networkSSM5").addClass('success');
    }

    if (data["HOUSEHOLD MANAGEMENT"][0] == '1') {
	jQuery("#_householdSSM1").addClass('danger');
    } else if (data["HOUSEHOLD MANAGEMENT"][0] == '2') {
	jQuery("#_householdSSM2").addClass('warning');
    } else if (data["HOUSEHOLD MANAGEMENT"][0] == '3') {
	jQuery("#_householdSSM3").addClass('info');
    } else if (data["HOUSEHOLD MANAGEMENT"][0] == '4') {
	jQuery("#_householdSSM4").addClass('success');
    } else if (data["HOUSEHOLD MANAGEMENT"][0] == '5') {
	jQuery("#_householdSSM5").addClass('success');
    }
}

function buildEachJSONString() {   

    var planOfActionString = '{"HOUSING":"' + jQuery("#_planOfActionHousing  option:selected").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_planOfActionMM  option:selected").val().trim() + '",' + '"EMPLOYMENT":"'
	    + jQuery("#_planOfActionEmp  option:selected").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_planOfActionEdu  option:selected").val().trim() + '",' + '"NETWORK SUPPORT":"' + jQuery("#_planOfActionNS  option:selected").val().trim()
	    + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_planOfActionHH  option:selected").val().trim() + '"}';
    jQuery("#_planOfActionString").val(planOfActionString);
    
    var planDetailsString = '{"HOUSING":"' + jQuery("#_planDetailsHousing").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_planDetailsMM").val().trim() + '",' + '"EMPLOYMENT":"'
    + jQuery("#_planDetailsEmp").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_planDetailsEdu").val().trim() + '",' + '"NETWORK SUPPORT":"' + jQuery("#_planDetailsNS").val().trim()
    + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_planDetailsHH").val().trim() + '"}';
    jQuery("#_planDetailsString").val(planDetailsString);
    
    var referralPartnerString = '{"HOUSING":"' + jQuery("#_referralPartnerHousing").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_referralPartnerMM").val().trim() + '",' + '"EMPLOYMENT":"'
    + jQuery("#_referralPartnerEmp").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_referralPartnerEdu").val().trim() + '",' + '"NETWORK SUPPORT":"' + jQuery("#_referralPartnerNS").val().trim()
    + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_referralPartnerHH").val().trim() + '"}';
    jQuery("#_referralPartnerString").val(referralPartnerString);

    var anticipatedOutcomeString = '{"HOUSING":"' + jQuery("#_aoHousing option:selected").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_aoMM option:selected").val().trim() + '",'
	    + '"EMPLOYMENT":"' + jQuery("#_aoEmp option:selected").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_aoEdu option:selected").val().trim() + '",' + '"NETWORK SUPPORT":"'
	    + jQuery("#_aoNS option:selected").val().trim() + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_aoHH option:selected").val().trim() + '"}';
    jQuery("#_anticipatedOutcomeString").val(anticipatedOutcomeString);
    
    var anticipatedDateString = '{"HOUSING":"' + jQuery("#_inputDateTextAnticipatedHousing").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_inputDateTextAnticipatedMM").val().trim() + '",'
    + '"EMPLOYMENT":"' + jQuery("#_inputDateTextAnticipatedEmp").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_inputDateTextAnticipatedEdu").val().trim() + '",' + '"NETWORK SUPPORT":"'
    + jQuery("#_inputDateTextAnticipatedNS").val().trim() + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_inputDateTextAnticipatedHH").val().trim() + '"}';
    jQuery("#_anticipatedDateString").val(anticipatedDateString);

    var outcomesAchievedString = '{"HOUSING":"' + jQuery("#_outAchHousing").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_outAchMM").val().trim() + '",'
	    + '"EMPLOYMENT":"' + jQuery("#_outAchEmp").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_outAchEdu").val().trim() + '",' + '"NETWORK SUPPORT":"'
	    + jQuery("#_outAchNS").val().trim() + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_outAchHH").val().trim() + '"}';
    jQuery("#_outcomesAchievedString").val(outcomesAchievedString);
    
    var achievedGoalString = '{"HOUSING":"' + jQuery("#_achGoalHousing  option:selected").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_achGoalMM  option:selected").val().trim() + '",'
    + '"EMPLOYMENT":"' + jQuery("#_achGoalEmp  option:selected").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_achGoalEdu option:selected").val().trim() + '",' + '"NETWORK SUPPORT":"'
    + jQuery("#_achGoalNS  option:selected").val().trim() + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_achGoalHH  option:selected").val().trim() + '"}';
    jQuery("#_achievedGoalString").val(achievedGoalString);
    
    var completionDateString = '{"HOUSING":"' + jQuery("#_inputDateTextHousing").val().trim() + '",' + '"MONEY MANAGEMENT":"' + jQuery("#_inputDateTextMM").val().trim() + '",'
    + '"EMPLOYMENT":"' + jQuery("#_inputDateTextEmp").val().trim() + '",' + '"EDUCATION":"' + jQuery("#_inputDateTextEdu").val().trim() + '",' + '"NETWORK SUPPORT":"'
    + jQuery("#_inputDateTextNS").val().trim() + '",' + '"HOUSEHOLD MANAGEMENT":"' + jQuery("#_inputDateTextHH").val().trim() + '"}';

    // These are all setting into hidden variables before saving Object   
    jQuery("#_completionDateString").val(completionDateString);

}


var format = "MM/DD/YYYY";
var match = new RegExp(format
    .replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*")
    .replace(/M|D|Y/g, "\\d"));
var replace = "$1/$2/$3$4"
    .replace(/\//g, format.match(/\W/));

function doFormat(target)
{
    target.value = target.value
        .replace(/(^|\W)(?=\d\W)/g, "$10")   // padding
        .replace(match, replace)             // fields
        .replace(/(\W)+/g, "$1");            // remove repeats
}

jQuery("input[id^='_inputDateText']").keyup(function(e) {
   if(!e.ctrlKey && !e.metaKey && (e.keyCode == 32 || e.keyCode > 46))
      doFormat(e.target)
});

function validateAndShowMessage(){
    
    var todaysDate = moment().format('DD-MMM-YYYY').toUpperCase();
    
    //check for Today's Date
    var todaysActionPlanExists = false;
    jQuery("#_dates option").each(function(){
	
	if(jQuery(this).val() == todaysDate){
	    todaysActionPlanExists = true;
	}	
    });
    
    var selOption = jQuery("#_dates option:selected").val();
    
    if(todaysActionPlanExists == true &&  selOption.indexOf('new') > -1){
	jQuery("#_actionPlanErrorMessage").removeClass('hideme');
	jQuery("input[type='submit']").prop('disabled', true);
    }else{
	
	if (jQuery("#_mostRecentSSMDate").text() != '--'){
	    jQuery("#_actionPlanErrorMessage").removeClass('hideme').addClass('hideme');
		jQuery("input[type='submit']").prop('disabled', false);
    	}
    }
}