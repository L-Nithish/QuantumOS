import type { DirectoryNode } from '../types/fs';

export const INITIAL_FS: DirectoryNode = {
  type: 'dir',
  children: {
    'home': {
      type: 'dir',
      children: {
        'admin': {
          type: 'dir',
          children: {
            'Documents': {
              type: 'dir',
              children: {
                'report-q4.pdf': { type: 'file', size: '2.4 MB', mod: '2024-12-15' },
                'meeting-notes.txt': {
                  type: 'file',
                  size: '12 KB',
                  mod: '2024-12-18',
                  content: 'Q4 Planning Meeting Notes\n==========================\nAttendees: Team Alpha, Team Beta\nDate: Dec 18, 2024\n\nAgenda:\n1. Q4 revenue review\n2. Product roadmap updates\n3. Hiring plan for Q1 2025\n4. Infrastructure migration timeline\n\nAction Items:\n- Finalize budget proposal by Dec 20\n- Schedule follow-up with engineering leads\n- Draft job descriptions for 3 new positions'
                },
                'budget-2025.xlsx': { type: 'file', size: '856 KB', mod: '2024-12-20' },
                'project-plan.md': {
                  type: 'file',
                  size: '24 KB',
                  mod: '2024-12-19',
                  content: '# Project Plan 2025\n\n## Phase 1: Foundation (Jan-Mar)\n- Infrastructure upgrade\n- Security audit\n- Team onboarding\n\n## Phase 2: Development (Apr-Jul)\n- Core platform rebuild\n- API v3 release\n- Partner integrations\n\n## Phase 3: Launch (Aug-Oct)\n- Beta testing program\n- Marketing campaign\n- GA release\n\n## Phase 4: Optimization (Nov-Dec)\n- Performance tuning\n- Feature refinements\n- Year-end review'
                },
              }
            },
            'Downloads': {
              type: 'dir',
              children: {
                'quabtom-manual.pdf': { type: 'file', size: '5.1 MB', mod: '2024-12-10' },
                'setup-tool.deb': { type: 'file', size: '34 MB', mod: '2024-12-08' },
                'api-docs.html': { type: 'file', size: '1.8 MB', mod: '2024-12-12' },
              }
            },
            'Pictures': {
              type: 'dir',
              children: {
                'screenshot.png': { type: 'file', size: '1.2 MB', mod: '2024-12-19' },
                'wallpaper.jpg': { type: 'file', size: '4.5 MB', mod: '2024-11-30' },
              }
            },
            'Desktop': { type: 'dir', children: {} },
            '.bashrc': {
              type: 'file',
              size: '3.2 KB',
              mod: '2024-11-01',
              content: '# QuabtomOS Shell Configuration\nexport PATH=/usr/bin:/usr/local/bin:$PATH\nexport EDITOR=qtnano\nexport QT_THEME=enterprise-dark\nalias ll="ls -la"\nalias cls="clear"\nPS1="\\u@quabtom:\\w$ "'
            },
            '.config': {
              type: 'dir',
              children: {
                'quabtom': {
                  type: 'dir',
                  children: {
                    'settings.json': {
                      type: 'file',
                      size: '1.4 KB',
                      mod: '2024-12-20',
                      content: '{\n  "theme": "enterprise-dark",\n  "wallpaper": "gradient-mesh",\n  "font_size": 13,\n  "animations": true,\n  "blur": true\n}'
                    },
                  }
                },
              }
            },
          }
        },
      }
    },
    'etc': {
      type: 'dir',
      children: {
        'quabtom.conf': { type: 'file', size: '4.8 KB', mod: '2024-10-15' },
        'hosts': { type: 'file', size: '256 B', mod: '2024-01-01' },
        'passwd': { type: 'file', size: '1.1 KB', mod: '2024-12-01' },
        'os-release': {
          type: 'file',
          size: '180 B',
          mod: '2024-10-15',
          content: 'NAME="QuabtomOS"\nVERSION="3.2.1"\nID=quabtom\nPRETTY_NAME="QuabtomOS Enterprise 3.2.1"\nHOME_URL="https://quabtom.io"'
        },
      }
    },
    'var': {
      type: 'dir',
      children: {
        'log': {
          type: 'dir',
          children: {
            'system.log': { type: 'file', size: '24 MB', mod: '2024-12-21' },
            'quabtom.log': { type: 'file', size: '8.2 MB', mod: '2024-12-21' },
            'auth.log': { type: 'file', size: '3.1 MB', mod: '2024-12-21' },
          }
        },
      }
    },
    'usr': {
      type: 'dir',
      children: {
        'bin': {
          type: 'dir',
          children: {
            'qsh': { type: 'file', size: '2.1 MB', mod: '2024-10-15' },
            'qtnano': { type: 'file', size: '890 KB', mod: '2024-10-15' },
          }
        },
        'lib': { type: 'dir', children: {} },
        'share': { type: 'dir', children: {} },
      }
    },
    'tmp': { type: 'dir', children: {} },
  }
};
