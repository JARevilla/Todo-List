# TODO_LIST

This project is a full-stack application with a Django backend, React frontend, and Celery for asynchronous task management. 
Below are the instructions to set up each part of the application.


# 1. Backend Setup (Django)

### Prerequisites
Make sure you have Python 3.x installed. You'll also need a Redis instance running for Celery.

### Step 1: Clone the Repository

```
git clone https://github.com/JARevilla/Todo-List.git
cd Todo_list
```

### Step 2: Set Up a Virtual Environment
Create and activate a virtual environment:
```
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies
Install the required dependencies listed in requirements.txt:
```
pip install -r requirements.txt
```

### Step 4: Configure the Database
```
python manage.py migrate
```

### Step 5: Set Up Celery
Celery requires a message broker like Redis. Make sure Redis is installed and running:
```
redis-server
```

### Step 6: Start the Django Development Server
Run the Django server:
```
python manage.py runserver
```


---
# 2. Frontend Setup (React)

### Step 1: Navigate to the Frontend Directory
```
cd frontend
```

### Step 2: Install Dependencies
```
npm install
```

### Step 3: Start the React Development Server
```
npm start
```


---
# 3. Celery Task Management

### Step 1: Start Celery Worker
```
celery -A Todo_list worker --loglevel=info
```
