import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IProject } from '@/interfaces/project.interface';
import API from '@/api/api';
import { SelectOption } from '@/modules/activities/Projects/partials/SelectInput';

type Project = {
  projectLeadId: string;
  projectLead: Record<string, any> | null;
  projectUsers: any[];
} & IProject;

export const getAllProjects = createAsyncThunk(
  'projects/get',
  async () => {
    const { data } = await API.get('/projects');
    return data;
  },
);

export const getProjectLead = createAsyncThunk(
  'project/projectLead/get',
  async (leadId: string) => {
    const { data } = await API.get(`/users/${leadId}`);
    return data;
  },
);

export const getProjectUsers = createAsyncThunk(
  'projects/projectUsers/get',
  async (projectId: string) => {
    const { data } = await API.get(`/projects/${projectId}/users`);
    return { projectId, data };
  },
);

export const getSingleProject = createAsyncThunk(
  'projects/singleProject/get',
  async (projId: string | undefined) => {
    const { data } = await API.get(`/projects/${projId}`);
    if (data.project.projectLeadId) {
      const {
        data: { user },
      } = await API.get(`/users/${data.project.projectLeadId}`);
      data.project.projectLead = user;
      const {
        data: { users },
      } = await API.get(`/projects/${data.project.id}/users`);
      data.project.projectUsers = users;
    }
    return data;
  },
);

export const createProject = createAsyncThunk(
  'projects/create',
  async ({
    project,
    projectLead,
    assignees,
  }: {
    project: IProject;
    projectLead: SelectOption | undefined;
    assignees: any[];
  }) => {
    const { data } = await API.post('/projects/create', project);
    if (projectLead) {
      await API.patch(`/projects/${data.project.id}/lead`, {
        email: projectLead?.email,
      });
    }
    if (assignees.length > 0) {
      const promises = assignees.map(user =>
        API.put(`/projects/${data.project.id}/users`, {
          email: user?.email,
        }),
      );
      await Promise.all(promises);
    }
    return data;
  },
);

export const deleteProjects = createAsyncThunk(
  'projects/delete',
  async (projectId: string) => {
    await API.delete(`/projects/${projectId}`);
    return projectId;
  },
);

export const deleteAssignee = createAsyncThunk(
  'project/deleteAssignee',
  async ({
    projectId,
    assigneeEmail,
  }: {
    projectId: string | undefined;
    assigneeEmail: string | undefined;
  }) => {
    await API.delete(`/projects/${projectId}/users`, {
      data: {
        email: assigneeEmail,
      },
    });
    return assigneeEmail;
  },
);

export const updatedProjectStatus = createAsyncThunk(
  'project/editStatus',
  async ({
    projectId,
    status,
  }: {
    projectId: string;
    status: string;
  }) => {
    await API.patch(`/projects/${projectId}/status`, {
      status,
    });
  },
);

export const updateProject = createAsyncThunk(
  'projects/edit',
  async ({
    project,
    projectLead,
    assignees,
  }: {
    project: Project;
    projectLead: SelectOption | undefined;
    assignees: any[];
  }) => {
    const { data } = await API.patch(
      `/projects/${project.id}`,
      project,
    );
    if (projectLead) {
      await API.patch(`/projects/${project.id}/lead`, {
        email: projectLead?.email,
      });
    }
    if (assignees.length > 0) {
      const promises = assignees.map(user =>
        API.put(`/projects/${project.id}/users`, {
          email: user?.email,
        }),
      );
      await Promise.all(promises);
    }
    return data;
  },
);

interface InitialState {
  isLoading: boolean;
  isLoadingProjectLead: boolean;
  projectLeadError: string | null;
  isLoadingProjectUsers: boolean;
  projectUsersError: string | null;
  error: string | null;
  projects: Project[];
  isUpdating: boolean;
  updateError: string | null;
  createError: string | null;
  isCreating: boolean;
  deleteError: string | null;
  isDeleting: boolean;
  singleProject: Project;
}

const initialState: InitialState = {
  isLoading: false,
  isLoadingProjectLead: false,
  projectLeadError: null,
  isLoadingProjectUsers: false,
  projectUsersError: null,
  error: null,
  isUpdating: false,
  updateError: null,
  createError: null,
  isCreating: false,
  deleteError: null,
  isDeleting: false,
  projects: [],
  singleProject: {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending',
    projectLead: {},
    projectUsers: [],
    projectLeadId: '',
  },
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProjects.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.projects;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      // add project lead
      .addCase(getProjectLead.pending, state => {
        state.isLoadingProjectLead = true;
        state.projectLeadError = null;
      })
      .addCase(getProjectLead.fulfilled, (state, action) => {
        state.isLoadingProjectLead = false;
        state.projects = state.projects.map(proj => {
          if (proj.projectLeadId === action.payload.user.id) {
            proj.projectLead = action.payload.user;
          }
          return proj;
        });
      })
      .addCase(getProjectLead.rejected, (state, action) => {
        state.isLoadingProjectLead = false;
        state.projectLeadError = action.error.message as string;
      })
      // add project users
      .addCase(getProjectUsers.pending, state => {
        state.isLoadingProjectUsers = true;
        state.projectUsersError = null;
      })
      .addCase(getProjectUsers.fulfilled, (state, action) => {
        state.isLoadingProjectUsers = false;
        state.projects = state.projects.map(proj => {
          if (proj.id === action.payload.projectId) {
            proj.projectUsers = action.payload.data.users;
          }
          return proj;
        });
      })
      .addCase(getProjectUsers.rejected, (state, action) => {
        state.isLoadingProjectLead = false;
        state.projectLeadError = action.error.message as string;
      })
      // single project
      .addCase(getSingleProject.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProject = action.payload.project;
        state.error = null;
      })
      .addCase(getSingleProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      // create project
      .addCase(createProject.pending, state => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isCreating = false;
        state.projects = state.projects.concat(
          action.payload.project,
        );
        state.createError = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.error.message as string;
      })
      // update project
      .addCase(updateProject.pending, state => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.singleProject = {
          ...state.singleProject,
          ...action.payload.updatedProject,
        };
        state.updateError = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message as string;
      })
      // update status
      .addCase(updatedProjectStatus.pending, state => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updatedProjectStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateError = null;
      })
      .addCase(updatedProjectStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message as string;
      })

      // delete project
      .addCase(deleteProjects.pending, state => {
        state.deleteError = null;
        state.isDeleting = true;
      })
      .addCase(deleteProjects.fulfilled, (state, action) => {
        state.deleteError = null;
        state.isDeleting = false;
        state.projects = state.projects.filter(
          proj => proj.id !== action.payload,
        );
      })
      .addCase(deleteProjects.rejected, (state, action) => {
        state.deleteError = action.error.message as string;
        state.isDeleting = false;
      })
      // delete assignee
      .addCase(deleteAssignee.pending, state => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(deleteAssignee.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.singleProject = {
          ...state.singleProject,
          projectUsers: state.singleProject.projectUsers.filter(
            (user: any) => user.email !== action.payload,
          ),
        };
        state.updateError = null;
      })
      .addCase(deleteAssignee.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message as string;
      });
  },
});

export default projectsSlice.reducer;
