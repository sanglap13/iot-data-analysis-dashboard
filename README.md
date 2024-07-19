# DataDesk

DataDesk is a mini IoT data analytics platform that simulate data, streaming from multiple IoT devices, store this data in a database and provide basic analytics on the collected data.

## Author

- [@sanglap13](https://github.com/sanglap13)
  (sanglapmridha@gmail.com)

## Tech Stack

**Frontend:** HTML, CSS, React, Typescript.

**Backend:** Python, Django.

**Database:** PostgreSQL.

**Component Library:** Material UI v5 & Material UI X/data-grid.

**Extras:** Axios, Vite, Nivo Charts.

## Screenshots

![Home](/screenshots/ss-home.png)

![Menu](/screenshots/ss-sidebar.png)

![Mobile](/screenshots/ss-sidebar.png)

## Backend (Django)📦

The backend is built using Django and Django REST Framework, providing a RESTful API to communicate with the frontend. It also has websockets implemented for real-time data.

### Setting Up the Backend 🛠️

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Go to `core/setting.py` :

```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mini-iot-dashboard',
        'USER': 'postgres',
        'PASSWORD': '1234',
        'HOST': 'localhost',  # Or your PostgreSQL host
        'PORT': '5433',       # Or your PostgreSQL port
    }
}
```

3. **Create a Python Virtual Environment (Optional, but recommended):**

   Create and activate a virtual environment to isolate project dependencies.

   On macOS and Linux:

   ```
   python3 -m venv venv
   source venv/bin/activate
   ```

   On Windows:

   ```
   pip install virtualenv
   virtualenv venv
   ./venv/Scripts/Activate.ps1
   ```

4. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

5. Run database migrations:
   ```bash
    python manage.py makemigrations
    python manage.py migrate
   ```
6. Start the Django development server:

As we are using websockets as well as REST APIs

```bash
 uvicorn core.asgi:application --host 0.0.0.0 --port 8000
```

P.S.- It can also be run using python3 manage.py runserver for running only the REST APIs.

7. Use `http://localhost:8000` as the API base URL.

## Frontend (React with Vite) ⚛️

The frontend is built using React and Vite, providing fast development and hot module replacement for efficient code changes. The frontend offers a user-friendly interface to interact with the API provided by the Django backend.

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the required Node packages:
   ```bash
    npm install
   ```
3. Start the Vite development server:
   ```bash
    npm run dev
   ```
4. Navigate to `http://localhost:5173` to view the frontend.

## Credits 👏

- Django: [https://www.djangoproject.com/](https://www.djangoproject.com/)
- Django REST Framework: [https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)
- React: [https://reactjs.org/](https://reactjs.org/)
- Vite: [https://vitejs.dev/](https://vitejs.dev/)
- Material UI: [https://mui.com/](https://mui.com/)
