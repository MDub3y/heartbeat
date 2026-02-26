**Heartbeat: Real-Time Uptime Monitoring**
------------------------------------------

Heartbeat is a full-stack, distributed monitoring solution designed to track website availability across multiple regions. It leverages a modern monorepo architecture to sync a Next.js dashboard with a high-speed Express API, powered by independent background workers that perform health checks from the edge.

### **Demo & Access**

**Demo Video**\[Placeholder: Link your Loom or mp4 video here\]

**Demo Screenshots**| Dashboard Overview | Real-Time Ticks || :--- | :--- || \[Insert Image Path\] | \[Insert Image Path\] |

**Test Credentials**

> **Email**: test@example.com
> 
> **Password**: Test@123

### **Core Features**

*   **Pixel-Perfect Dashboard**: A refined, responsive UI built with Next.js 16 and Tailwind CSS 4, featuring real-time latency visualizations and status grids.
    
*   **Distributed Monitoring**: Independent background workers simulate global pings, feeding high-fidelity data into a centralized Prisma-managed database.
    
*   **Secure Authentication**: Integrated Better Auth implementation supporting session management across a shared monorepo domain.
    
*   **Real-Time Bridge**: Live data synchronization between local monitoring workers and the cloud-hosted dashboard using Neon’s serverless driver and connection pooler.
    

### **Technical Architecture**

The project is structured as a **Turborepo** monorepo to ensure seamless code sharing and optimized build pipelines.

#### **1\. Frontend (Next.js 16)**

*   **Role**: Serves as the user-facing command center.
    
*   **Tech**: React 19, Turbopack, Framer Motion, and Recharts.
    
*   **Function**: Manages user authentication, monitor configuration, and renders live status "ticks" from the database.
    

#### **2\. API (Express)**

*   **Role**: The central logic hub and data gateway.
    
*   **Tech**: Node.js, Express 5, Zod, and Better Auth.
    
*   **Function**: Handles CRUD operations for monitors, serves health-check history, and manages secure session validation.
    

#### **3\. Worker (Bun)**

*   **Role**: The execution engine for health checks.
    
*   **Tech**: Bun runtime, Axios, and Prisma Client.
    
*   **Function**: Periodically pings target URLs, measures response times, and writes "website\_tick" records directly to the database.
    

#### **4\. Pusher (Background Service)**

*   **Role**: Data synchronization and cleanup.
    
*   **Tech**: Bun.
    
*   **Function**: Orchestrates the flow of regional data and ensures consistent state between distributed components.
    

### **System Flow**

1.  **User Setup**: A user signs in via the Frontend and adds a website URL to monitor.
    
2.  **API Processing**: The API validates the request via Zod and stores the new monitor in the Neon Database.
    
3.  **Worker Execution**: Background Workers (running locally or at the edge) detect the new monitor and begin high-frequency pings.
    
4.  **Data Ingestion**: Each ping result (Up/Down/Latency) is saved as a "tick" in the database.
    
5.  **Live View**: The Frontend polls the API, which retrieves the latest ticks. The UI updates in real-time to show the monitor's health status.
    

### **Local Development**

This project uses **Bun** as the primary package manager and runtime.

#### **Prerequisites**

*   Install [Bun](https://bun.sh/)
    
*   A PostgreSQL database (Neon recommended)

#### **Setup**

## 

1.  **Clone the repository**:
    
    Bash
    
        git clone https://github.com/MDub3y/heartbeat.git
        cd heartbeat
    
2.  **Install dependencies**:
    
    Bash
    
        bun install
    
3.  **Configure Environment Variables**: Create a `.env` file in the root with:
    
    Code snippet
    
        DATABASE_URL=your_neon_db_url
        BETTER_AUTH_SECRET=your_secret
        BETTER_AUTH_URL=http://localhost:3000
        NEXT_PUBLIC_API_URL=http://localhost:3001
    

#### **Running the Application**

## 

-   **Start**:
    
    Bash
    
        bun dev
