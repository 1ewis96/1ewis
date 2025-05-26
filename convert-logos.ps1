# PowerShell script to create placeholder WebP files
$logoNames = @("bittrue", "ledger", "youhodler", "revolut", "tradingview", "cointracking", "nordvpn")

foreach ($logo in $logoNames) {
    $sourcePath = ".\public\logos\$logo.svg"
    $targetPath = ".\public\logos\$logo.webp"
    
    # Create an empty WebP file
    New-Item -Path $targetPath -ItemType File -Force | Out-Null
    
    Write-Host "Created placeholder for $logo.webp"
}

Write-Host "All WebP placeholders created. You'll need to replace these with actual WebP images."
