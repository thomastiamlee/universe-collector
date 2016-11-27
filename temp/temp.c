
#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    int i, prime = 1;

    for (i = 2; i < n; i++) {
      if (n %  i == 0) {
        prime = 0;
      }
    }
    printf(prime == 1 ? "prime":"not prime");
}
