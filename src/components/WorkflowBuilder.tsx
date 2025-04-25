
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Position,
} from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckSquare, Bell, GitBranch } from 'lucide-react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  task: ({ data }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[180px]">
      <div className="flex items-center gap-2">
        <CheckSquare className="w-5 h-5 text-automation-primary" />
        <span className="font-medium">{data.label}</span>
      </div>
    </div>
  ),
  approval: ({ data }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[180px]">
      <div className="flex items-center gap-2">
        <ArrowRight className="w-5 h-5 text-automation-secondary" />
        <span className="font-medium">{data.label}</span>
      </div>
    </div>
  ),
  notification: ({ data }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[180px]">
      <div className="flex items-center gap-2">
        <Bell className="w-5 h-5 text-orange-500" />
        <span className="font-medium">{data.label}</span>
      </div>
    </div>
  ),
  condition: ({ data }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[180px]">
      <div className="flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-purple-500" />
        <span className="font-medium">{data.label}</span>
      </div>
    </div>
  ),
};

const initialNodes = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
    className: 'bg-green-100 border-green-500 rounded-full px-4 py-2',
  },
];

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDragging, setIsDragging] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      const newNode = {
        id: String(Date.now()),
        type,
        position,
        data: { label: `New ${type}` },
        className: 'bg-white border border-gray-200 rounded-lg shadow-lg',
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  return (
    <div className="flex h-full">
      <div className="w-64 bg-white border-r p-4">
        <h3 className="font-semibold mb-4 text-gray-700">Workflow Elements</h3>
        <div className="space-y-2">
          {[
            { type: 'task', label: 'Task', icon: CheckSquare },
            { type: 'approval', label: 'Approval', icon: ArrowRight },
            { type: 'notification', label: 'Notification', icon: Bell },
            { type: 'condition', label: 'Condition', icon: GitBranch },
          ].map(({ type, label, icon: Icon }) => (
            <Card
              key={type}
              className={`p-3 cursor-move transition-all ${
                isDragging ? 'opacity-50' : ''
              }`}
              draggable
              onDragStart={(e) => onDragStart(e, type)}
              onDragEnd={() => setIsDragging(false)}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
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
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap zoomable pannable />
          <Background gap={16} size={1} />
          <Panel position="top-right">
            <Button 
              variant="outline" 
              onClick={() => console.log(nodes, edges)}
              className="bg-white"
            >
              Save Workflow
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
