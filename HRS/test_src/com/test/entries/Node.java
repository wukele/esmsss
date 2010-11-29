package com.test.entries;

import java.util.ArrayList;
import java.util.List;

public class Node {
	private String id;
	private String text;
	private boolean leaf=false;
	private List<Node> childNodes=new ArrayList<Node>();
	private String listener;
	
	
	public Node(String id, String text, boolean leaf, List<Node> childNodes) {
		super();
		this.id = id;
		this.text = text;
		this.leaf = leaf;
		if(childNodes != null)
		this.childNodes = childNodes;
	}

	public Node() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Node(String id,String text)
	{
		this.id=id;
		this.text=text;
	}
	public String getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public List<Node> getChildNodes() {
		return childNodes;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public void setChildNodes(List<Node> childNodes) {
		this.childNodes = childNodes;
	}
	
	public boolean hasChildren(Node node){
		if(node == null || node.getChildNodes() == null||node.getChildNodes().size() == 0)
			return false;
		else
			return true;
	}

	public String getListener() {
		return listener;
	}

	public void setListener(String listener) {
		this.listener = listener;
	}

	public Node(String id, String text, boolean leaf, List<Node> childNodes,
			String listener) {
		super();
		this.id = id;
		this.text = text;
		this.leaf = leaf;
		if(childNodes!=null)
		this.childNodes = childNodes;
		this.listener = listener;
	}
	
}
