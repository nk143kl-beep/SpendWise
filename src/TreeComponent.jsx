import React from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";


const folder = 
    {
        "id": "root",
        "name": "Root",
        "parent": null,
        "children":
        [
            {
                "id": "1",
                "name": "Parent 1",
                "parent": "root",
                "children":
                [
                    {
                        "id": "2",
                        "name": "Child 1.1",
                        "parent": "1",
                        "children":
                        []
                    },
                    {
                        "id": "3",
                        "name": "Child 1.2",
                        "parent": "1",
                        "children":
                        []
                    }
                ]
            },
            {
                "id": "4",
                "name": "Parent 2",
                "parent": "root",
                "children":
                [
                    {
                        "id": "5",
                        "name": "Child 2.1",
                        "parent": "4",
                        "children":
                        []
                    }
                ]
            }
        ]
    }
;

const data = flattenTree(folder);
console.log('data :>> ', data);
const BasicTreeView = () => (
  <TreeView
    data={data}
    className="basic"
    aria-label="basic example tree"
    nodeRenderer={({ element, getNodeProps, level, handleSelect }) => (
      <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
        {element.name}
      </div>
    )}
  />
);

export default BasicTreeView;