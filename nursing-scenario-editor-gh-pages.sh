#!/bin/bash

# Git 사용자 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 프로젝트 디렉토리로 이동
cd nursing-scenario-editor

# 의존성 설치
npm install

# GitHub Pages 배포 패키지 설치
npm install gh-pages --save-dev

# 빌드
npm run build

# GitHub Pages에 배포
npm run deploy
