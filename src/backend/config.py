"""
Configuration management for Autopilot backend
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # API Settings
    api_title: str = "Windows Autopilot Troubleshooter API"
    api_version: str = "1.0.0"
    debug: bool = False

    # Azure AD / Microsoft Graph
    tenant_id: Optional[str] = None
    client_id: Optional[str] = None
    client_secret: Optional[str] = None

    # Graph API permissions required:
    # - DeviceManagementManagedDevices.Read.All
    # - DeviceManagementConfiguration.Read.All
    # - DeviceManagementServiceConfig.Read.All

    graph_api_endpoint: str = "https://graph.microsoft.com/v1.0"

    # Database
    database_url: str = "sqlite:///./data/autopilot.db"

    # Logging
    log_level: str = "INFO"
    log_file: str = "logs/autopilot-backend.log"

    # PowerShell
    powershell_module_path: str = "../powershell"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
