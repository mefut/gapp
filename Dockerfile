# Base image olarak Node.js'in son sürümünü kullanıyoruz
FROM node:18.17.0

# Çalışma dizinini ayarlıyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# Gerekli bağımlılıkları yüklüyoruz
RUN npm install

# Uygulama kaynak kodunu kopyalıyoruz
COPY . .

# Uygulamayı derliyoruz
RUN npm run build

# Uygulamanın çalışacağı portu belirtiyoruz
EXPOSE 3000

# Uygulamayı başlatıyoruz
CMD ["npm", "start"]
