$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backupRoot = Join-Path $projectRoot "backups"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$snapshotDir = Join-Path $backupRoot ("snapshot-" + $timestamp)

$filesToCopy = @(
  "index.html",
  "globe.html",
  "landing.css",
  "script.js",
  "stylesheet.css",
  "data.js",
  "README.md",
  "CHANGELOG.md"
)

New-Item -ItemType Directory -Force -Path $snapshotDir | Out-Null

foreach ($relativePath in $filesToCopy) {
  $sourcePath = Join-Path $projectRoot $relativePath

  if (Test-Path -LiteralPath $sourcePath) {
    Copy-Item -LiteralPath $sourcePath -Destination $snapshotDir -Force
  }
}

$logPath = Join-Path $backupRoot "backup-log.txt"
$logLine = "{0}`t{1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $snapshotDir
Add-Content -LiteralPath $logPath -Value $logLine

Write-Output ("Backup created: " + $snapshotDir)
