
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
    type: 'input',
  },
];

const initialEdges: any[] = [];

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      const newNode = {
        id: String(Date.now()),
        type: 'default',
        position,
        data: { label: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex h-full">
      <div className="w-64 bg-white border-r p-4">
        <h3 className="font-semibold mb-4">Workflow Elements</h3>
        <div className="space-y-2">
          {['Task', 'Approval', 'Notification', 'Condition'].map((type) => (
            <Card
              key={type}
              className="p-3 cursor-move"
              draggable
              onDragStart={(e) => onDragStart(e, type)}
            >
              {type}
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
          <Panel position="top-right">
            <Button variant="outline" onClick={() => console.log(nodes, edges)}>
              Save Workflow
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
