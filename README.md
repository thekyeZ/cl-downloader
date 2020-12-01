# Coderslab Repo Downloader


Skrypt służący do pobierania dowolnego repozytorum z forków kursantów.

Aby korzystać ze skryptu należy wyeksportować do pliku users.txt listę username'ów kursantów.

Program tworzy następującą strukturę katalogów:

```
cl-downloader
│
└───repos
│   └───ONL_FER_W_03_Prework_-_JavaScript
│   |   └───UserName1
|   |       └─── <pliki_repozytorium>
│   |   └───UserName2
|   |      └─── <pliki_repozytorium>
|   |
|   └───ONL_FER_W_03_Prework_-_HTML
│       └───UserName1
|           └─── <pliki_repozytorium>
│       └───UserName2
|           └─── <pliki_repozytorium>
```

Więc możliwe jest trzymanie wielu repozytoriów w jedym katalogu

```sh
$ git clone https://github.com/thekyeZ/cl-downloader
$ cd cl-downloader
$ node . -r ONL_FER_W_03_Prework_-_JavaScript
```

Podana wyżej komenda pobierze wskazane repozytorium dla każdego kursanta. Jeśli skrypt wykryje że repozytorium zostało już pobrane, automatycznie pobierze najnowszą wersję.

Istnieje możliwość wymuszenia aktualizacji (pull) wszystkich repozytortów poprzez:

```sh
$ node . -r ONL_FER_W_03_Prework_-_JavaScript -u
```

Jeśli nie chcesz za każdym razem przekazywać nazwy repozytorium do pobrania możesz ją dodać do zmiennej `repoName` - należy wtedy __pominąć__ parametr `-r <nazwa_repo`

Pobranie repozytoriów wszystkich kursantów
```sh
$ node .
```

Update (pull) repozytoriów wszystkich kursntów
```sh
$ node . -u
```