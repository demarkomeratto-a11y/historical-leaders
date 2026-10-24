@echo off
title Historical Leaders - Vercel Deployment (24/7)
chcp 65001 >nul
echo.
echo ======================================================================
echo   🏛️ HISTORICAL LEADERS - VERCEL GA JOYLASHTIRISH VA 24/7 ISHLATISH
echo ======================================================================
echo.
echo 1. Loyihani tekshirish va build qilish...
call npm run build
if %errorlevel% neq 0 (
    echo [XATO] Build qilishda xatolik yuz berdi!
    pause
    exit /b %errorlevel%
)
echo.
echo [OK] Build muvaffaqiyatli yakunlandi (dist papkasi tayyor).
echo.
echo 2. Vercel serveriga chiqarilmoqda...
echo    (Agar birinchi marta bo'lsa, brauzer orqali Vercel akkauntingizga kiring)
echo.
call npx vercel --prod
echo.
echo ======================================================================
echo   Tabriklaymiz! Sayt Vercel serverida 24/7 rejimda ishga tushdi!
echo ======================================================================
pause
