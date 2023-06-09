param (
    [Parameter(Mandatory = $true)][string]$tenantAppCatalogUrl
)
# Validate the url
if ($null -eq $tenantAppCatalogUrl) {
    Write-Host "Tenant app catalog URL is mandatory parameter. Please specify value."
    return
}

# Connect to the SharePoint site
Connect-PnPOnline -Url $tenantAppCatalogUrl -Interactive

# Verify tenant app catalog URL
$url = Get-PnPTenantAppCatalogUrl
if ($url -ne $tenantAppCatalogUrl) {
    Write-Host "Provided URL is not a tenant app catalog Url. Please check the URL and try again."
    return
}

# Apply the PnP Provisioning Template
Invoke-PnPSiteTemplate -Path dashboard.xml