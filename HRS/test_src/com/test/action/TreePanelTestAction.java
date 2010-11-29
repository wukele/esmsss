package com.test.action;

import java.util.ArrayList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.test.entries.Node;


public class TreePanelTestAction extends ActionSupport {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2389713782670521955L;

	private List<Node> nodes;
	
	@Override
	public String execute() throws Exception {
		nodes=new ArrayList<Node>();
		Node node = new Node("1","root",false,null,"function(node,evt){alert(node.id)}");
		node.getChildNodes().add(new Node("2","2",true,null,"function(node,evt){alert(node.id);}"));
		nodes.add(node);
		return SUCCESS;
	}

	public List<Node> getNodes() {
		return nodes;
	}

	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}
	
}
