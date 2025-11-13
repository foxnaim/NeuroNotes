'use client';

import React from 'react';
import { motion } from 'framer-motion';

const glowGradient = (primaryWeight = 12, secondaryWeight = 8) =>
  `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) ${primaryWeight}%, var(--color-surface) ${100 - primaryWeight}%) 0%, color-mix(in srgb, var(--color-secondary) ${secondaryWeight}%, var(--color-surface) ${100 - secondaryWeight}%) 100%)`;

const surfaceSoft = (weight = 20) =>
  `color-mix(in srgb, var(--color-surface) ${100 - weight}%, var(--color-background) ${weight}%)`;

const borderSoft = (weight = 20) =>
  `color-mix(in srgb, var(--color-border) ${100 - weight}%, var(--color-primary) ${weight}%)`;

const shadowSoft = (colorVar = 'var(--color-primary)', opacity = 0.24) =>
  `0 24px 48px -30px color-mix(in srgb, ${colorVar} 25%, rgba(0, 0, 0, ${opacity}))`;

export default function IntegrationsPage() {
  return (
    <div className="min-h-full px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <div className="max-w-7xl mx-auto space-y-10">
        <motion.section 
          className="border rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
          style={{
            background: glowGradient(12, 8),
            borderColor: borderSoft(20),
            boxShadow: shadowSoft('var(--color-primary)', 0.24)
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6">Интеграции</h2>
          
          <div className="space-y-4">
            <motion.div 
              className="border rounded-2xl p-6"
              style={{
                background: surfaceSoft(20),
                borderColor: borderSoft(20)
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">Подключение внешних приложений</h3>
              <p className="text-sm text-text-secondary">Подключите ваши любимые приложения для синхронизации данных</p>
            </motion.div>

            <motion.div 
              className="border rounded-2xl p-6"
              style={{
                background: surfaceSoft(20),
                borderColor: borderSoft(20)
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">API ключи, webhooks</h3>
              <p className="text-sm text-text-secondary">Настройте API ключи и webhooks для интеграции с внешними сервисами</p>
            </motion.div>

            <motion.div 
              className="border rounded-2xl p-6"
              style={{
                background: surfaceSoft(20),
                borderColor: borderSoft(20)
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">Визуальная панель подключений</h3>
              <p className="text-sm text-text-secondary">Управляйте всеми подключениями в одном месте</p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

