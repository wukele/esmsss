package com.alarm.entity;

/**
 * AlarmPolicyEffectArea entity. @author MyEclipse Persistence Tools
 */

public class AlarmPolicyEffectArea implements java.io.Serializable {

	// Fields

	private AlarmPolicyEffectAreaId id;

	// Constructors

	/** default constructor */
	public AlarmPolicyEffectArea() {
	}

	/** full constructor */
	public AlarmPolicyEffectArea(AlarmPolicyEffectAreaId id) {
		this.id = id;
	}

	// Property accessors

	public AlarmPolicyEffectAreaId getId() {
		return this.id;
	}

	public void setId(AlarmPolicyEffectAreaId id) {
		this.id = id;
	}

}