# Birthday Website Project

## Overview

This is a personalized birthday website application built with Flask, designed to create an interactive celebration page for "Mehbuba Rahman". The application features animated hearts, photo/video upload capabilities, and a festive user interface with Bootstrap styling. The project serves as a digital birthday card with multimedia capabilities, allowing users to upload and display photos and videos as part of the birthday celebration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask for server-side rendering
- **Styling Framework**: Bootstrap 5.3.2 for responsive design and component styling
- **CSS Animations**: Custom CSS with keyframe animations for floating hearts and gradient backgrounds
- **JavaScript**: Vanilla JavaScript for interactive elements, video player controls, and upload form handling
- **Font Integration**: Google Fonts (Dancing Script, Poppins) and Font Awesome icons for visual enhancement

### Backend Architecture
- **Web Framework**: Flask (Python) as the main web application framework
- **File Upload Handling**: Werkzeug utilities for secure file upload processing
- **Session Management**: Flask sessions with configurable secret key from environment variables
- **Middleware**: ProxyFix middleware for proper header handling in deployed environments
- **Static File Serving**: Flask's built-in static file serving for uploaded content

### File Management System
- **Upload Directory**: Static uploads folder (`static/uploads`) for storing user-uploaded media
- **File Validation**: Whitelist-based file type validation for images (png, jpg, jpeg, gif) and videos (mp4, mov, avi)
- **Security**: Werkzeug's `secure_filename` function to prevent directory traversal attacks
- **Size Limits**: 50MB maximum file size limit to prevent server resource exhaustion

### Application Structure
- **Single Page Application**: Main functionality served through one primary route with dynamic content
- **RESTful Upload Endpoint**: POST endpoint for handling file uploads with proper error handling
- **Flash Messaging**: User feedback system for upload status and error notifications
- **Environment Configuration**: Environment variable support for sensitive configuration like session secrets

## External Dependencies

### Frontend Libraries
- **Bootstrap 5.3.2**: CSS framework for responsive design and UI components
- **Font Awesome 6.5.1**: Icon library for visual elements and animations
- **Google Fonts API**: Custom typography (Dancing Script, Poppins fonts)

### Python Packages
- **Flask**: Core web framework for routing and templating
- **Werkzeug**: WSGI utilities for file handling and security functions

### Infrastructure Requirements
- **Static File Storage**: File system storage for uploaded media content
- **Environment Variables**: Support for SESSION_SECRET configuration
- **WSGI Server**: Compatible with standard WSGI deployment (configured for host 0.0.0.0, port 5000)

### Browser Compatibility
- **Modern Browser Support**: Requires browsers with CSS3 animation support and ES6 JavaScript features
- **Mobile Optimization**: Responsive design with viewport meta tags and mobile-friendly video attributes