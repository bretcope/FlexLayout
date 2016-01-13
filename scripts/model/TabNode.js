import Node from "./Node.js";
import JsonConverter from "../JsonConverter.js";
import DockLocation from "../DockLocation.js";
import TabSetNode from "./TabSetNode.js";
import RowNode from "./RowNode.js";

class TabNode extends Node
{
    constructor(model)
    {
        super(model);
        jsonConverter.setDefaults(this);

        this._tabRect = null; // rect of the tab rather than the tab contents=
        this._extra = {};  // extra data added to node not saved in json
    }

    getTabRect()
    {
        return this._tabRect;
    }

    setTabRect(rect)
    {
        this._tabRect = rect;
    }

    getName()
    {
        return this._name;
    }

    getComponent()
    {
        return this._component;
    }

    getExtraData()
    {
        return this._extra;
    }

    getConfig()
    {
        return this._config;
    }

    isEnableClose()
    {
        return this._enableClose;
    }

    isEnableDrag()
    {
        return this._enableDrag;
    }

    isEnableRename()
    {
        return this._enableRename;
    }

    getClassName()
    {
        return this._className;
    }

    static _create(model, json)
    {
        var node = TabNode._fromJson(json,model);
        model._addNode(node);
        return node;
    }

    _setName(name)
    {
        this._name = name;
    }

	_layout(rect)
	{
		if ( !rect.equals(this._rect))
		{
			this._fireEvent("resize", {rect:rect});
		}
		this._rect = rect;
	}

    _delete()
    {
        this._parent._remove(this);
        this._fireEvent("close", {});
    }

    static _fromJson(json, model)
    {
        var newLayoutNode = new TabNode(model);
        jsonConverter.fromJson(json, newLayoutNode);
        return newLayoutNode;
    }

    _toJson()
    {
        var json = {};
        jsonConverter.toJson(json, this);
        return json;
    }

    toString(lines, indent)
    {
        lines.push(indent + this._type + " " + this._name);
    }
}

TabNode.TYPE = "tab";

var jsonConverter = new JsonConverter();
jsonConverter.addConversion("_type", "type", TabNode.TYPE, true);
jsonConverter.addConversion("_name", "name", null);
jsonConverter.addConversion("_component", "component", null);
jsonConverter.addConversion("_config", "config", null);
jsonConverter.addConversion("_id", "id", null);

jsonConverter.addConversion("_enableClose", "enableClose", true);
jsonConverter.addConversion("_enableDrag", "enableDrag", true);
jsonConverter.addConversion("_enableRename", "enableRename", false);
jsonConverter.addConversion("_className", "className", null);

export default TabNode;