# Docker Setup for Heroes Angular Application

This document explains how to use Docker to run the Heroes Angular application in different environments.

## 🐳 **Prerequisites**

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)
- Git (for cloning the repository)

## 🚀 **Quick Start**

### 1. **Build Images**
```bash
# Using Docker script
./docker-scripts.sh build

# Or manually
docker build --target development -t heroes:dev .
docker build --target production -t heroes:prod .
```

### 2. **Run in Development**
```bash
./docker-scripts.sh dev
```
The application will be available at: **http://localhost:4200**

### 3. **Run in Production**
```bash
./docker-scripts.sh prod
```
The application will be available at: **http://localhost**

## 📋 **Available Commands**

### **Docker Scripts**
```bash
./docker-scripts.sh [command]
```

| Command | Description | Port |
|---------|-------------|------|
| `build` | Build all images | - |
| `dev` | Start development environment | 4200 |
| `prod` | Start production environment | 80 |
| `prod-custom` | Production on custom port | 8080 |
| `test` | Start testing environment | 4201 |
| `stop` | Stop all services | - |
| `logs [service]` | View service logs | - |
| `cleanup` | Clean up Docker resources | - |
| `status` | Show current status | - |
| `help` | Show help | - |

### **Direct Docker Compose Commands**
```bash
# Development
docker-compose up heroes-dev -d

# Production
docker-compose up heroes-prod -d

# Testing
docker-compose up heroes-test -d

# View logs
docker-compose logs -f heroes-dev

# Stop everything
docker-compose down
```

## 🏗️ **Docker Architecture**

### **Multi-Stage Build**
- **Base**: Base image with Node.js 18 Alpine
- **Development**: Development environment with hot-reload
- **Build**: Angular application build
- **Production**: Optimized nginx server

### **Available Services**

#### **1. Development (heroes-dev)**
- **Port**: 4200
- **Features**: Hot-reload, debugging, interactive development
- **Volumes**: Source code mounted for real-time changes

#### **2. Production (heroes-prod)**
- **Port**: 80
- **Features**: Optimized application, nginx, gzip compression
- **Security**: Security headers, optimized cache

#### **3. Production Custom (heroes-prod-custom)**
- **Port**: 8080
- **Features**: Same as production but on alternative port

#### **4. Testing (heroes-test)**
- **Port**: 4201
- **Features**: Testing environment with Karma/Jasmine

### **View Real-Time Logs**
```bash
# Development
./docker-scripts.sh logs heroes-dev

# Production
./docker-scripts.sh logs heroes-prod

# All services
docker-compose logs -f
```

### **Service Status**
```bash
./docker-scripts.sh status
```

### **Clean Up Resources**
```bash
./docker-scripts.sh cleanup
```
This command:
- Stops all containers
- Removes images
- Cleans unused resources

### **Rebuild Images**
```bash
# Clean and rebuild
./docker-scripts.sh cleanup
./docker-scripts.sh build
```

## 🚨 **Troubleshooting**

### **Port already in use**
```bash
# See what's using the port
netstat -ano | findstr :4200

# Use alternative port
./docker-scripts.sh prod-custom
```

### **Permission issues (Linux/Mac)**
```bash
# Give execution permissions to script
chmod +x docker-scripts.sh
```

### **Container won't start**
```bash
# View error logs
docker-compose logs heroes-dev

# Check status
docker-compose ps
```

### **Memory issues**
```bash
# Increase Docker Desktop memory
# Settings > Resources > Memory (recommended: 4GB+)
```

## 🔍 **Debugging**

### **Access Container**
```bash
# Development
docker exec -it heroes-dev sh

# Production
docker exec -it heroes-prod sh
```

### **View Environment Variables**
```bash
docker exec heroes-dev env
```

### **View Container Files**
```bash
docker exec heroes-dev ls -la /app
```

## 📈 **Optimizations**

### **Build Cache**
- Dependencies cached in separate layers
- Only rebuilds when `package*.json` changes

### **Multi-Stage Build**
- Smaller production image
- Only includes files needed for runtime

### **Optimized Nginx**
- Gzip compression enabled
- Optimized cache headers
- Angular SPA configuration

## 🌐 **Deployment**

### **Local/Development**
```bash
./docker-scripts.sh dev
```

### **Staging/Testing**
```bash
./docker-scripts.sh test
```

### **Production**
```bash
./docker-scripts.sh prod
```

### **Custom Port**
```bash
./docker-scripts.sh prod-custom
```
---

**Enjoy developing with Docker! 🚀** 