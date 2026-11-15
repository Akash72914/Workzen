export const PROJECT_STATUS = {
    PLANNING: "PLANNING",
    ACTIVE: "ACTIVE",
    ON_HOLD: "ON_HOLD",
    COMPLETED: "COMPLETED",
    ARCHIVED: "ARCHIVED",
};

export const PROJECT_PRIORITY = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    URGENT: "URGENT",
};

export const PROJECT_STATUS_OPTIONS = [
    { label: "Planning", value: PROJECT_STATUS.PLANNING },
    { label: "Active", value: PROJECT_STATUS.ACTIVE },
    { label: "On Hold", value: PROJECT_STATUS.ON_HOLD },
    { label: "Completed", value: PROJECT_STATUS.COMPLETED },
    { label: "Archived", value: PROJECT_STATUS.ARCHIVED },
];

export const PROJECT_PRIORITY_OPTIONS = [
    { label: "Low", value: PROJECT_PRIORITY.LOW },
    { label: "Medium", value: PROJECT_PRIORITY.MEDIUM },
    { label: "High", value: PROJECT_PRIORITY.HIGH },
    { label: "Urgent", value: PROJECT_PRIORITY.URGENT },
];

export const mockProjects = [
    {
        id: "project-001",
        name: "Workzen Platform",
        description:
            "Building a collaborative project management platform for modern teams.",
        status: PROJECT_STATUS.ACTIVE,
        priority: PROJECT_PRIORITY.URGENT,
        progress: 72,
        owner: { id: "user-001", name: "Akash Yadav", initials: "AY" },
        members: [
            { id: "user-001", name: "Akash Yadav", initials: "AY" },
            { id: "user-002", name: "Rahul Sharma", initials: "RS" },
            { id: "user-003", name: "Priya Singh", initials: "PS" },
        ],
        totalTasks: 45,
        completedTasks: 32,
        startDate: "2026-08-01",
        dueDate: "2026-12-20",
        createdAt: "2026-07-25T09:00:00.000Z",
    },
    {
        id: "project-002",
        name: "Customer Portal",
        description:
            "A self-service portal for customers to manage their accounts and requests.",
        status: PROJECT_STATUS.ACTIVE,
        priority: PROJECT_PRIORITY.HIGH,
        progress: 48,
        owner: { id: "user-002", name: "Rahul Sharma", initials: "RS" },
        members: [
            { id: "user-002", name: "Rahul Sharma", initials: "RS" },
            { id: "user-004", name: "Neha Verma", initials: "NV" },
            { id: "user-005", name: "Amit Kumar", initials: "AK" },
        ],
        totalTasks: 36,
        completedTasks: 17,
        startDate: "2026-09-10",
        dueDate: "2027-01-15",
        createdAt: "2026-09-02T10:30:00.000Z",
    },
    {
        id: "project-003",
        name: "Mobile Application",
        description:
            "Developing a cross-platform mobile experience for the product.",
        status: PROJECT_STATUS.PLANNING,
        priority: PROJECT_PRIORITY.HIGH,
        progress: 12,
        owner: { id: "user-003", name: "Priya Singh", initials: "PS" },
        members: [
            { id: "user-003", name: "Priya Singh", initials: "PS" },
            { id: "user-001", name: "Akash Yadav", initials: "AY" },
        ],
        totalTasks: 28,
        completedTasks: 3,
        startDate: "2026-11-20",
        dueDate: "2027-03-30",
        createdAt: "2026-10-28T08:15:00.000Z",
    },
    {
        id: "project-004",
        name: "Marketing Website",
        description:
            "Redesigning the company website with improved performance and SEO.",
        status: PROJECT_STATUS.COMPLETED,
        priority: PROJECT_PRIORITY.MEDIUM,
        progress: 100,
        owner: { id: "user-004", name: "Neha Verma", initials: "NV" },
        members: [
            { id: "user-004", name: "Neha Verma", initials: "NV" },
            { id: "user-005", name: "Amit Kumar", initials: "AK" },
        ],
        totalTasks: 24,
        completedTasks: 24,
        startDate: "2026-06-01",
        dueDate: "2026-10-15",
        createdAt: "2026-05-20T11:00:00.000Z",
    },
    {
        id: "project-005",
        name: "Analytics Dashboard",
        description:
            "Centralized analytics dashboard for business performance tracking.",
        status: PROJECT_STATUS.ACTIVE,
        priority: PROJECT_PRIORITY.MEDIUM,
        progress: 65,
        owner: { id: "user-005", name: "Amit Kumar", initials: "AK" },
        members: [
            { id: "user-005", name: "Amit Kumar", initials: "AK" },
            { id: "user-002", name: "Rahul Sharma", initials: "RS" },
            { id: "user-003", name: "Priya Singh", initials: "PS" },
        ],
        totalTasks: 40,
        completedTasks: 26,
        startDate: "2026-08-15",
        dueDate: "2026-12-10",
        createdAt: "2026-08-05T12:00:00.000Z",
    },
    {
        id: "project-006",
        name: "Payment Integration",
        description:
            "Integrating secure online payments and subscription billing.",
        status: PROJECT_STATUS.ON_HOLD,
        priority: PROJECT_PRIORITY.URGENT,
        progress: 35,
        owner: { id: "user-001", name: "Akash Yadav", initials: "AY" },
        members: [
            { id: "user-001", name: "Akash Yadav", initials: "AY" },
            { id: "user-005", name: "Amit Kumar", initials: "AK" },
        ],
        totalTasks: 20,
        completedTasks: 7,
        startDate: "2026-07-10",
        dueDate: "2026-11-30",
        createdAt: "2026-07-01T14:00:00.000Z",
    },
    {
        id: "project-007",
        name: "Internal Documentation",
        description:
            "Creating technical documentation and onboarding guides for the team.",
        status: PROJECT_STATUS.ACTIVE,
        priority: PROJECT_PRIORITY.LOW,
        progress: 82,
        owner: { id: "user-003", name: "Priya Singh", initials: "PS" },
        members: [
            { id: "user-003", name: "Priya Singh", initials: "PS" },
            { id: "user-004", name: "Neha Verma", initials: "NV" },
        ],
        totalTasks: 17,
        completedTasks: 14,
        startDate: "2026-09-01",
        dueDate: "2026-11-25",
        createdAt: "2026-08-28T09:45:00.000Z",
    },
    {
        id: "project-008",
        name: "Legacy System Migration",
        description:
            "Migrating legacy application services to the updated architecture.",
        status: PROJECT_STATUS.ARCHIVED,
        priority: PROJECT_PRIORITY.LOW,
        progress: 20,
        owner: { id: "user-002", name: "Rahul Sharma", initials: "RS" },
        members: [
            { id: "user-002", name: "Rahul Sharma", initials: "RS" },
            { id: "user-004", name: "Neha Verma", initials: "NV" },
        ],
        totalTasks: 30,
        completedTasks: 6,
        startDate: "2026-03-01",
        dueDate: "2026-08-30",
        createdAt: "2026-02-15T08:00:00.000Z",
    },
];
