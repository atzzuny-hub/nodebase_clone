 "use client"


import { useState, useCallback } from 'react';
import { 
    ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge,
    type Node, // 노드 타입
    type Edge, // 엣지 타입
    type NodeChange, // 노드 변경 이벤트 타입
    type EdgeChange, // 엣지 변경 이벤트 타입 
    type Connection, // 연결 파라미터 타입
    Background,
    Controls,
    MiniMap,
    Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ErrorView, LoadingView } from "@/components/entity-components"
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows"
import { nodeComponents } from '@/config/node-components';
import { AddNodeButton } from './add-node-button';

export const EditorLoading = () => {
    return <LoadingView message="Loading editor..."/>
}

export const EditorError = () => {
    return <ErrorView message="Error loading editor..."/>
}


// 플로우차트의 박스/요소
const initialNodes = [
    { 
        id: 'n1',              // 고유 식별자
        position: { x: 0, y: 0 }, // 캔버스상 위치
        data: { label: 'Node 1' } // 노드에 표시할 데이터
    },
    { 
        id: 'n2', 
        position: { x: 0, y: 100 }, 
        data: { label: 'Node 2' } 
    },
];

// 노드 간의 연결 선
const initialEdges = [{ 
    id: 'n1-n2',    // 고유 식별자
    source: 'n1',   // 시작 노드 ID
    target: 'n2'    // 도착 노드 ID 
}];



export const Editor = ({workflowId}:{workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId)

    // 상태 관리
    const [nodes, setNodes] = useState<Node[]>(workflow.nodes); // 현재 캔버스에 있는 모든 노드들
    const [edges, setEdges] = useState<Edge[]>(workflow.edges); // 현재 캔버스에 있는 모든 연결선들

    // onNodesChange - 노드 변경 처리(노드 드래그, 노드 선택/해제, 노드 삭제, 노드의 크기 변경시점)
    const onNodesChange = useCallback(
        // useCallback 사용이유
        // React Flow는 매 렌더링마다 props 변경을 체크
        // 함수가 매번 새로 생성되면 불필요한 리렌더링 발생
        // useCallback으로 함수를 메모이제이션해서 성능 최적화
        
        (changes:NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    // onEdgesChange - 엣지 변경 처리(엣지 선택/해제, 엣지 삭제, 엣지 스타일 변경시점)
    const onEdgesChange = useCallback(
        (changes:EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    // onConnect - 새 연결 생성( 노드의 핸들을 드래그해서 다른 노드에 연결할때 호출 )
    const onConnect = useCallback(

        // params:Connection 구조 
        // {
        //     source: 'n1',        // 시작 노드
        //     target: 'n2',        // 끝 노드
        //     sourceHandle: null,  // 시작 핸들 ID (옵션)
        //     targetHandle: null   // 끝 핸들 ID (옵션)
        // }

        (params:Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), // addEdge는 중복 체크를 하고 새 엣지를 배열에 추가
        [],
    );
    
    return(
        <div className='size-full'>
            <ReactFlow
                nodes={nodes}              // 표시할 노드들
                edges={edges}              // 표시할 엣지들
                onNodesChange={onNodesChange}  // 노드 변경 핸들러
                onEdgesChange={onEdgesChange}  // 엣지 변경 핸들러
                onConnect={onConnect}      // 연결 생성 핸들러
                nodeTypes={nodeComponents}
                fitView                    // 초기 로드시 모든 노드가 보이도록 자동 줌
            >
                <Background/>
                <Controls/>
                <MiniMap/>
                <Panel position='top-right'>
                    <AddNodeButton/>
                </Panel>
            </ReactFlow>
        </div>
    )
 }