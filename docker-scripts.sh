#!/bin/bash

# Docker scripts for Heroes Angular application
# Usage: ./docker-scripts.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build images
build_images() {
    print_status "Building Docker images..."
    
    # Build all targets
    docker build --target development -t heroes:dev .
    docker build --target production -t heroes:prod .
    
    print_success "Images built successfully!"
    print_status "Available images:"
    docker images | grep heroes
}

# Function to start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose up heroes-dev -d
    
    print_success "Development environment started!"
    print_status "Access your app at: http://localhost:4200"
    print_status "To view logs: docker-compose logs -f heroes-dev"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose up heroes-prod -d
    
    print_success "Production environment started!"
    print_status "Access your app at: http://localhost"
    print_status "To view logs: docker-compose logs -f heroes-prod"
}

# Function to start production on custom port
start_prod_custom() {
    print_status "Starting production environment on port 8080..."
    docker-compose up heroes-prod-custom -d
    
    print_success "Production environment started!"
    print_status "Access your app at: http://localhost:8080"
    print_status "To view logs: docker-compose logs -f heroes-prod-custom"
}

# Function to start testing environment
start_test() {
    print_status "Starting testing environment..."
    docker-compose up heroes-test -d
    
    print_success "Testing environment started!"
    print_status "Access your app at: http://localhost:4201"
    print_status "To view logs: docker-compose logs -f heroes-test"
}

# Function to stop all services
stop_all() {
    print_status "Stopping all services..."
    docker-compose down
    
    print_success "All services stopped!"
}

# Function to view logs
view_logs() {
    local service=${1:-heroes-dev}
    print_status "Viewing logs for $service..."
    docker-compose logs -f $service
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    
    # Stop and remove containers
    docker-compose down
    
    # Remove images
    docker rmi heroes:dev heroes:prod 2>/dev/null || true
    
    # Remove unused containers, networks, and images
    docker system prune -f
    
    print_success "Cleanup completed!"
}

# Function to show status
show_status() {
    print_status "Docker services status:"
    docker-compose ps
    
    echo ""
    print_status "Docker images:"
    docker images | grep heroes || echo "No heroes images found"
    
    echo ""
    print_status "Docker containers:"
    docker ps -a | grep heroes || echo "No heroes containers found"
}

# Function to show help
show_help() {
    echo "Docker Scripts for Heroes Angular Application"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  build       Build all Docker images"
    echo "  dev         Start development environment (port 4200)"
    echo "  prod        Start production environment (port 80)"
    echo "  prod-custom Start production environment (port 8080)"
    echo "  test        Start testing environment (port 4201)"
    echo "  stop        Stop all services"
    echo "  logs [service] View logs (default: heroes-dev)"
    echo "  cleanup     Clean up all Docker resources"
    echo "  status      Show current status"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build"
    echo "  $0 dev"
    echo "  $0 logs heroes-prod"
    echo "  $0 cleanup"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        build)
            build_images
            ;;
        dev)
            start_dev
            ;;
        prod)
            start_prod
            ;;
        prod-custom)
            start_prod_custom
            ;;
        test)
            start_test
            ;;
        stop)
            stop_all
            ;;
        logs)
            view_logs "$2"
            ;;
        cleanup)
            cleanup
            ;;
        status)
            show_status
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 