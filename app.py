import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "birthday_secret_key_2025")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure upload settings
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'avi'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """Main birthday page"""
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads for photos and video"""
    if 'file' not in request.files:
        flash('No file selected')
        return redirect(url_for('index'))
    
    file = request.files['file']
    file_type = request.form.get('type', 'photo1')
    
    if file.filename == '':
        flash('No file selected')
        return redirect(url_for('index'))
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_extension = filename.rsplit('.', 1)[1].lower()
        
        # Rename file based on type
        if file_type == 'video':
            new_filename = f'video.{file_extension}'
        elif file_type == 'photo1':
            new_filename = f'photo1.{file_extension}'
        elif file_type == 'photo2':
            new_filename = f'photo2.{file_extension}'
        elif file_type == 'hero-photo1':
            new_filename = f'hero-photo1.{file_extension}'
        elif file_type == 'hero-photo2':
            new_filename = f'hero-photo2.{file_extension}'
        else:
            new_filename = filename
            
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
        file.save(file_path)
        flash(f'File uploaded successfully as {new_filename}')
        app.logger.info(f'File uploaded: {new_filename}')
    else:
        flash('Invalid file type. Please upload images (PNG, JPG, JPEG, GIF) or videos (MP4, MOV, AVI)')
    
    return redirect(url_for('index'))

@app.route('/health')
def health():
    """Health check endpoint"""
    return {'status': 'healthy', 'message': 'Birthday website is running!'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
