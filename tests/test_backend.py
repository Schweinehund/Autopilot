"""
Backend API tests
"""

import pytest
from fastapi.testclient import TestClient
from src.backend.main import app

client = TestClient(app)


def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "service" in response.json()
    assert response.json()["status"] == "running"


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_get_devices():
    """Test get devices endpoint"""
    response = client.get("/api/devices")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_run_diagnostics():
    """Test diagnostics endpoint"""
    response = client.post("/api/diagnostics/run?device_id=test-device")
    assert response.status_code == 200
    assert response.json()["status"] == "success"


def test_invalid_remediation_action():
    """Test invalid remediation action"""
    response = client.post(
        "/api/remediation/execute",
        json={
            "device_id": "test-device",
            "action": "invalid_action",
            "parameters": {}
        }
    )
    assert response.status_code == 400


def test_connectivity_check():
    """Test connectivity check endpoint"""
    response = client.get("/api/diagnostics/connectivity")
    assert response.status_code == 200
