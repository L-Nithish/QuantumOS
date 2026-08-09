import { render, screen, waitFor } from '@testing-library/react';
import Issues from './Issues';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { taskService } from '../../../api/taskService';
import { projectService } from '../../../api/projectService';

// Mock the API services
vi.mock('../../../api/taskService', () => ({
  taskService: {
    getAllTasks: vi.fn(),
    createTask: vi.fn(),
    updateTaskStatus: vi.fn()
  }
}));

vi.mock('../../../api/projectService', () => ({
  projectService: {
    getAllProjects: vi.fn()
  }
}));

// Mock stompjs to prevent websocket errors during test
vi.mock('@stomp/stompjs', () => ({
  Client: class {
    activate = vi.fn();
    deactivate = vi.fn();
    subscribe = vi.fn();
  }
}));

// Mock sockjs-client
vi.mock('sockjs-client', () => {
  return {
    default: vi.fn()
  };
});

describe('Issues Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    // Return a promise that doesn't resolve immediately
    vi.mocked(taskService.getAllTasks).mockReturnValue(new Promise(() => {}));
    vi.mocked(projectService.getAllProjects).mockReturnValue(new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <Issues />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading issues.../i)).toBeInTheDocument();
  });

  it('should display issues when loaded', async () => {
    vi.mocked(taskService.getAllTasks).mockResolvedValue([
      { id: '1', title: 'Test Task', status: 'TODO', priority: 'HIGH', projectId: 'p1', description: 'Desc' }
    ]);
    vi.mocked(projectService.getAllProjects).mockResolvedValue([
      { id: 'p1', name: 'Test Project', description: '' }
    ]);

    render(
      <MemoryRouter>
        <Issues />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading issues.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});
