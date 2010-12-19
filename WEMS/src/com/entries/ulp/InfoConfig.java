package com.entries.ulp;



/**
 * InfoConfig entity. @author MyEclipse Persistence Tools
 */

public class InfoConfig  implements java.io.Serializable {


    // Fields    

     private String configId;
     private String configName;
     private String configValue;
     private String configDesc;


    // Constructors

    /** default constructor */
    public InfoConfig() {
    }

	/** minimal constructor */
    public InfoConfig(String configId, String configValue) {
        this.configId = configId;
        this.configValue = configValue;
    }
    
    /** full constructor */
    public InfoConfig(String configId, String configName, String configValue, String configDesc) {
        this.configId = configId;
        this.configName = configName;
        this.configValue = configValue;
        this.configDesc = configDesc;
    }

   
    // Property accessors

    public String getConfigId() {
        return this.configId;
    }
    
    public void setConfigId(String configId) {
        this.configId = configId;
    }

    public String getConfigName() {
        return this.configName;
    }
    
    public void setConfigName(String configName) {
        this.configName = configName;
    }

    public String getConfigValue() {
        return this.configValue;
    }
    
    public void setConfigValue(String configValue) {
        this.configValue = configValue;
    }

    public String getConfigDesc() {
        return this.configDesc;
    }
    
    public void setConfigDesc(String configDesc) {
        this.configDesc = configDesc;
    }
   








}