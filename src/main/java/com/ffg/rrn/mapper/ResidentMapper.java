/**
 * 
 */
package com.ffg.rrn.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ffg.rrn.model.Resident;

/**
 * @author FFGRRNTEam
 *
 */
public class ResidentMapper implements RowMapper<Resident> {

	public static final String RESIDENT_SQL //
			= "select r.RESIDENT_ID, r.ACTIVE, r.IS_RESIDENT, r.FIRST_NAME, r.MIDDLE, r.LAST_NAME, r.PROP_ID,r.VIA_VOICEMAIL, r.VOICEMAIL_NO, r.VIA_TEXT, r.TEXT_NO, r.VIA_EMAIL, r.EMAIL, r.ADDRESS, r.ACK_PR, "
					+ " r.ALLOW_CONTACT, r.WANTS_SURVEY, r.PHOTO_RELEASE, r.SERVICE_COORD, r.REF_TYPE, r.A_TYPE, "
					+ " r.date_added, r.date_modified, r.modified_by, p.prop_name, ref.ref_value, a.a_value, "
					+ " (select string_agg(full_name || ' (' || PVR_FLAG || ')', ', ') from child where parent_id = r.resident_id) as children, "
					+ " ap.referral_partner , ap.anticipated_date , ap.plan_of_action, ap.plan_details, ap.anticipated_outcomes,  ap.followup_notes, ap.outcome_achieved, ap.achieved_ssm, ap.completion_date, ap.date_added as apDateAdded, ap.date_modified as apDateModified, "
					+ " cn.description, cn.assessment, cn.plan, cn.date_added as cnDateAdded, cn.date_modified as cnDateModified,"
					+ " rf.INTERPRETATION, rf.REFERRED_BY, rf.REFERRAL_REASON, rf.COMMENTS, rf.PREVIOUS_ATTEMPTS, rf.SELF_SUFFICIENCY, rf.RF_HOUSING_STABILITY, rf.SAFE_SUPPORTIVE_COMMUNITY, rf.RF_FOLLOWUP_NOTES, rf.RES_APP_SCHEDULED, rf.date_added as rfDateAdded, rf.date_modified as rfDateModified"
					+ " from Resident r join referral ref on ref.ref_id = r.ref_type"
					+ " join property p on p.prop_id = r.prop_id"
					+ " left join action_plan ap on ap.resident_id = r.resident_id"
					+ " left join case_notes cn on cn.resident_id = r.resident_id"
					+ " left join referral_form rf on rf.resident_id = r.resident_id"
					+ " left join assessment_type a on a.a_id = r.a_type ";
	
	@Override
	public Resident mapRow(ResultSet rs, int row) throws SQLException {

		Resident r = new Resident();

		r.setResidentId(rs.getLong("RESIDENT_ID"));
		r.setActive(rs.getBoolean("ACTIVE"));
		r.setIsResident(rs.getBoolean("IS_RESIDENT"));
		r.setFirstName(rs.getString("FIRST_NAME"));
		r.setMiddle(rs.getString("MIDDLE"));
		r.setLastName(rs.getString("LAST_NAME"));
		r.setPropertyId(rs.getInt("PROP_ID"));
		r.setViaVoicemail(rs.getBoolean("VIA_VOICEMAIL"));
		r.setVoiceMail(rs.getString("VOICEMAIL_NO"));
		r.setViaText(rs.getBoolean("VIA_TEXT"));
		r.setText(rs.getString("TEXT_NO"));
		r.setViaEmail(rs.getBoolean("VIA_EMAIL"));
		r.setEmail(rs.getString("EMAIL"));
		r.setAddress(rs.getString("ADDRESS"));
		r.setAckRightToPrivacy(rs.getBoolean("ACK_PR"));
		r.setAllowContact(rs.getBoolean("ALLOW_CONTACT"));
		r.setWantSurvey(rs.getBoolean("WANTS_SURVEY"));
		r.setPhotoRelease(rs.getBoolean("PHOTO_RELEASE"));
		r.setServiceCoord(rs.getString("SERVICE_COORD"));
		r.setRefId(rs.getInt("REF_TYPE"));
		r.setAId(rs.getInt("A_TYPE"));		
		r.setDateAdded(rs.getTimestamp("DATE_ADDED"));
		r.setDateModified(rs.getTimestamp("DATE_MODIFIED"));
		r.setModifiedBy(rs.getString("MODIFIED_BY"));
		r.setPropertyName(rs.getString("PROP_NAME"));
		r.setRefValue(rs.getString("REF_VALUE"));
		r.setAValue(rs.getString("A_VALUE"));
		r.setChildList(rs.getString("children"));

		// ActionPlan
		r.setReferralPartner(rs.getString("referral_partner"));
		r.setAnticipatedDates(rs.getString("anticipated_date"));
		r.setPlanOfAction(rs.getString("PLAN_OF_ACTION"));
		r.setAnticipatedOutcome(rs.getString("ANTICIPATED_OUTCOMES"));
		r.setOutcomesAchieved(rs.getString("OUTCOME_ACHIEVED"));
		r.setCompletionDates(rs.getString("COMPLETION_DATE"));
		r.setAchievedGoals(rs.getString("ACHIEVED_SSM"));
		r.setPlanDetails(rs.getString("PLAN_DETAILS"));
		r.setFollowUpNotes(rs.getString("FOLLOWUP_NOTES"));
		r.setActionPlanDateAdded(rs.getDate("apDateAdded"));
		r.setActionPlanDateModified(rs.getDate("apDateModified"));

		// Case Notes
		r.setDescription(rs.getString("DESCRIPTION"));
		r.setAssessment(rs.getString("ASSESSMENT"));
		r.setPlan(rs.getString("PLAN"));
		r.setCnDateAdded(rs.getDate("cnDateAdded"));
		r.setCnDateModified(rs.getDate("cnDateModified"));

		// Referral Form
		r.setInterpretation(rs.getBoolean("INTERPRETATION"));
		r.setReferredBy(rs.getString("REFERRED_BY"));
		r.setReferralReason(rs.getString("REFERRAL_REASON"));
		r.setCommentsOrExplanation(rs.getString("COMMENTS"));
		r.setPreviousAttempts(rs.getString("PREVIOUS_ATTEMPTS"));
		r.setSelfSufficiency(rs.getString("SELF_SUFFICIENCY"));
		r.setHousingStability(rs.getString("RF_HOUSING_STABILITY"));
		r.setSafeSupportiveCommunity(rs.getString("SAFE_SUPPORTIVE_COMMUNITY"));
		r.setRfFollowUpNotes(rs.getString("RF_FOLLOWUP_NOTES"));
		r.setResidentAppointmentScheduled(rs.getString("RES_APP_SCHEDULED"));
		r.setReferralFormDateAdded(rs.getDate("rfDateAdded"));
		r.setReferralFormDateModified(rs.getDate("rfDateModified"));

		return r;

	}

}
